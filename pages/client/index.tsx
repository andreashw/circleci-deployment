import { ScrollArea, Pagination, Drawer, Text, Table, Menu, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import EditUserForm from '@components/Forms/EditUser';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import { IResponse } from '@contracts/response-interface';
import { IClient } from '@contracts/client-interface';
import SearchForm from '@components/Forms/Search';
import { Edit2 } from 'react-feather';
import Router from 'next/router';

function Clients() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [activePage, setPage] = useState(1);

  function fetchClient() {
    const { data, error } = useSWR<IResponse<IClient[]>>('/api/v1/clients/', fetcher);

    return {
      dataClient: data?.data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { dataClient } = fetchClient();
  useEffect(() => {
    if (dataClient) {
      setClients(dataClient);
    }
  }, [dataClient]);

  const body = () =>
    clients.map((item: any, index: any) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
        <td>
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
              <Menu.Item
                icon={<Edit2 />}
                onClick={() => {
                  setSelectedProfileData(item);
                  toggleDrawer(true);
                }}
              >
                Edit
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              {/* <Menu.Item
              icon={<Trash2 />}
              onClick={() => deleteProfile(user)}
              color="red"
            >
              Delete User
            </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));
  const onSubmitEditForm = (oldAutomobile: any, newAutomobile: any) => {
    toggleDrawer(false);

    // edit data in db

    let tmpautomobiles = clients;
    tmpautomobiles.splice(tmpautomobiles.indexOf(oldAutomobile), 0, newAutomobile);
    tmpautomobiles = tmpautomobiles.filter((u: any) => u !== oldAutomobile);
    setClients(tmpautomobiles);

    showNotification({
      title: 'Profile',
      message: `${newAutomobile.manufacturer} Edit Success`,
      color: 'teal',
    });
  };

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} />
      </Drawer>
      <div className="px-6 pt-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Clients
        </Text>
        <div className="flex justify-between">
          <SearchForm />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/client/add')}>
            Add New Clients
          </Button>
        </div>
      </div>
      {clients.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
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
      <div className="flex justify-between my-5">
        <Text color="#828282" size={14}>
          Show 10 from 1020 clients
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div>
    </>
  );
}

export default Clients;
