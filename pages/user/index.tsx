import { ScrollArea, Drawer, Text, Table, Menu, Button } from '@mantine/core';
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import True from 'icons/True';
import False from 'icons/False';
import useSWR from 'swr';
import { IUser } from '@contracts/user-interface';

function ListUserPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataUsers, mutate } = useSWR('/api/v1/users/');

  const onDeleteData = async (user: IUser) => {
    const response: IUser | undefined = await fetcher(`/api/v1/users/${user.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      mutate();
    }
  };
  function deleteProfile(user: IUser) {
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{user.Email}</b> User Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(user),
    });
  }

  const body = () =>
    dataUsers.map((item: IUser, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer" onClick={() => Router.push(`/user/${item.ID}`)}>
          {item.Email}
        </td>
        {item.IsActive === true ? (
          <td
            className="flex cursor-pointer w-full content-center items-center h-24 pl-9"
            onClick={() => Router.push(`/user/${item.ID}`)}
          >
            <True color="#00D13B" width="20" height="20" />
          </td>
        ) : (
          <td
            className="flex cursor-pointer w-full content-center items-center h-24 pl-9"
            onClick={() => Router.push(`/user/${item.ID}`)}
          >
            <False color="#ff0000" width="20" height="20" />
          </td>
        )}
        <td className="cursor-pointer" onClick={() => Router.push(`/user/${item.ID}`)}>
          {item.Roles}
        </td>

        <td className="cursor-pointer">
          <Menu>
            <Menu.Target>
              {/* <Button variant="white" color={'red'}>Action</Button> */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '60px',
                  height: '36px',
                }}
              >
                <IconDotsVertical size={14} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{item.Email}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/user/edit/${item.ID}`)}>
                Edit User
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete User
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Users
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Users" />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/user/add')}>
            Add New Entry
          </Button>
        </div>
      </div>
      {dataUsers.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Is Active</th>
                <th>Role</th>
                <th />
              </tr>
            </thead>
            <tbody>{body()}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text className="my-5" align="center" weight="bold">
          Tidak ada data.
        </Text>
      )}
    </>
  );
}

export default ListUserPage;
