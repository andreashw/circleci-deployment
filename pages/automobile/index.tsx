import { useState, useEffect } from 'react';
import { Table, ScrollArea, Menu, Drawer, Text, Pagination, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { Edit2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';

import EditUserForm from '@components/Forms/EditUser';

import useSWR from 'swr';
import { IAutomobile } from '@contracts/automobile-interface';
import { fetcher } from '@api/fetcher';
import { IResponse } from '@contracts/response-interface';
import SearchForm from '@components/Forms/Search';
import Router from 'next/router';

export default function Automobile(/*props*/) {
  const [automobiles, setAutomobiles] = useState<IAutomobile[]>([]); // props.automobiles
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [activePage, setPage] = useState(1);

  function fetchAutomobile() {
    const { data, error } = useSWR<IResponse<IAutomobile[]>>('/api/v1/automobiles/', fetcher);

    return {
      dataAutomobiles: data?.data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { dataAutomobiles } = fetchAutomobile();

  useEffect(() => {
    if (dataAutomobiles) {
      setAutomobiles(dataAutomobiles);
    }
  }, [dataAutomobiles]);

  const onSubmitEditForm = (oldAutomobile: any, newAutomobile: any) => {
    toggleDrawer(false);

    // edit data in db

    let tmpautomobiles = automobiles;
    tmpautomobiles.splice(tmpautomobiles.indexOf(oldAutomobile), 0, newAutomobile);
    tmpautomobiles = tmpautomobiles.filter((u: any) => u !== oldAutomobile);
    setAutomobiles(tmpautomobiles);

    showNotification({
      title: 'Profile',
      message: `${newAutomobile.manufacturer} Edit Success`,
      color: 'teal',
    });
  };

  const body = () =>
    automobiles.map((item: any, index: any) => (
      <tr key={index}>
        <td>{item.AutomobileManufactures.name}</td>
        <td>{item.AutomobileBrands.name}</td>
        <td>{item.wheel_base}</td>
        <td>{item.bodytype}</td>
        <td>{item.year_start}</td>
        <td>{item.power_type}</td>
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
              <Menu.Label>{item.AutomobileManufactures.name}</Menu.Label>
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

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={() => toggleDrawer(false)}
        title="Modify user"
        padding="xl"
        size="xl"
      >
        <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} />
      </Drawer>

      <div className="px-6 pt-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Automobile
        </Text>
        <div className="flex justify-between">
          <SearchForm />
          <Button
            className="bg-black hover:bg-black px-6"
            onClick={() => Router.push('/automobile/add')}
          >
            Add New Automobile
          </Button>
        </div>
      </div>

      {automobiles.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Body Type</th>
                <th>Prod. Year</th>
                <th>Power Type</th>
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
          Show 10 from 1020 automobiles
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div>
    </>
  );
}

/*
export async function getServerSideProps() {
  const request = await fetch("http://localhost:3000/api/automobiles");
  const automobiles = await request.json();

  return {
    props: {
      automobiles,
    },
  };
}
*/
