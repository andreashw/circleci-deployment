import { ScrollArea, Drawer, Text, Table, Menu, Button } from '@mantine/core';
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import { IClient } from '@contracts/client-interface';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { IRole } from '@contracts/role-interface';

function ListRolePage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataRole, mutate } = useSWR('/api/v1/role/');

  const onDeleteData = async (role: IRole) => {
    const response: IClient | undefined = await fetcher(`/api/v1/role/${role.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
  };
  function deleteProfile(role: IRole) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{role.name}</b> Client Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(role),
    });
    console.log('====================================');
    // const response: IClient | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }

  const body = () =>
    dataRole.map((item: IRole, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer">{item.name}</td>
        <td className="cursor-pointer">{item.description}</td>

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
              <Menu.Label>{item.name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/role/edit/${item.ID}`)}>
                Edit Role
              </Menu.Item>
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
          Roles
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Role" />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/role/add')}>
            Add New Role
          </Button>
        </div>
      </div>
      {dataRole.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
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

export default ListRolePage;
