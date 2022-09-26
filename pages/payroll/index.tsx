import { ScrollArea, Pagination, Drawer, Text, Table, Button, Menu } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import Router from 'next/router';
import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';
import { useModals } from '@mantine/modals';
import { IClient } from '@contracts/client-interface';
import { fetcher } from '@api/fetcher';

function PayrollPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);
  const [activePage, setPage] = useState(1);

  const { data: dataClients, mutate } = useSWR('/api/v1/clients/');
  const onDeleteData = async (client: IClient) => {
    console.log(client.ID);

    const response: IClient | undefined = await fetcher(`/api/v1/clients/${client.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
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
    dataClients.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.name}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.email}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.City.name}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.phone}
        </td>
        <td className="cursor-pointer   w-2/12">
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
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/client/edit/${item.ID}`)}>
                Edit
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
      <div className="px-6 pt-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Payroll
        </Text>
        <div className="flex justify-between">
          <SearchForm />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/payroll/add')}>
            Add New Payroll
          </Button>
        </div>
      </div>
      {dataClients.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Payroll Date</th>
                <th>Periode</th>
                <th>Total</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>{body()}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Test.
        </Text>
      )}
      <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 clients
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div>
    </>
  );
}

export default PayrollPage;