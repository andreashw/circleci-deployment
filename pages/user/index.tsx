import { ScrollArea, Drawer, Text, Table, Menu, Button } from '@mantine/core';
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import { fetcher } from '@api/fetcher';
import { IClient } from '@contracts/client-interface';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import True from 'icons/True';
import False from 'icons/False';

function ListUserPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const dataUsers = [
    {
      ID: 1,
      email: 'hilmi@gmail.com',
      is_active: true,
      role: 'superadmin',
    },
    {
      ID: 2,
      email: 'dev@gmail.com',
      is_active: false,
      role: 'admin',
    },
    {
      ID: 3,
      email: 'devs@gmail.com',
      is_active: true,
      role: 'superadmin',
    },
    {
      ID: 4,
      email: 'root@gmail.com',
      is_active: true,
      role: 'admin',
    },
  ];

  const onDeleteData = async (client: IClient) => {
    console.log(client.ID);

    const response: IClient | undefined = await fetcher(`/api/v1/clients/${client.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      //   mutate();
    }
  };
  function deleteProfile(client: IClient) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{client.name}</b> Client Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(client),
    });
    console.log('====================================');
    // const response: IClient | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }

  const body = () =>
    dataUsers.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/role/${item.ID}`)}>
          {item.email}
        </td>
        {item.is_active === true ? (
          <td className="flex cursor-pointer w-full content-center items-center h-24 pl-9">
            <True color="#00D13B" width="20" height="20" />
          </td>
        ) : (
          <td className="flex cursor-pointer w-full content-center items-center h-24 pl-9">
            <False color="#ff0000" width="20" height="20" />
          </td>
        )}
        <td className="cursor-pointer" onClick={() => Router.push(`/role/${item.ID}`)}>
          {item.role}
        </td>

        <td className="cursor-pointer w-2/12">
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
              <Menu.Label>{item.name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/role/edit/${item.ID}`)}>
                Edit Role
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete Role
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
            Add New User
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
