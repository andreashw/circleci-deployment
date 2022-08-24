import { useState } from 'react';
import { Table, ScrollArea, Menu, Drawer, Text, Pagination, Divider, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';

import Search from '@components/Forms/Search';
import EditUserForm from '@components/Forms/EditUser';

const MOCKUP_AUTOMOBILE: any = [
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
  {
    manufacturer: 'Mercedes Benz',
    brand: 'mercedes',
    model: 'S220',
    bodytype: 'Sedan',
    prodyear: '1950-1980',
    powertype: 'ICE',
  },
];

export default function Automobile(/*props*/) {
  const [automobiles, setAutomobiles] = useState(MOCKUP_AUTOMOBILE); // props.automobiles
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [activePage, setPage] = useState(1);

  const onSearch = (search: any) => {
    setSearchLoading(true);

    const trimmedSearch = search.toLowerCase().trim();

    if (!trimmedSearch) {
      setAutomobiles(MOCKUP_AUTOMOBILE); // props.automobiles
      setSearchLoading(false);
      return;
    }

    const filteredautomobiles = automobiles.filter(
      (automobile: {
        manufacturer: string;
        brand: string;
        model: string;
        bodytype: string;
        prodyear: string;
        powertype: string | any[];
      }) =>
        automobile.manufacturer.toLowerCase().includes(search) ||
        automobile.brand.toLowerCase().includes(search) ||
        automobile.model.toLowerCase().includes(search) ||
        automobile.bodytype.toLowerCase().includes(search) ||
        automobile.prodyear.includes(search) ||
        automobile.powertype.includes(search)
    );

    setAutomobiles(filteredautomobiles);

    setSearchLoading(false);
  };

  const cancelSearch = () => {
    setAutomobiles(MOCKUP_AUTOMOBILE); // props.automobiles
  };

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

      <div className="p-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Automobile
        </Text>
        <div className="flex justify-between">
          <Search loading={searchLoading} onSubmit={onSearch} onCancel={cancelSearch} />
          <Button className="bg-black hover:bg-black px-6">Add New Automobile</Button>
        </div>
      </div>

      {MOCKUP_AUTOMOBILE.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
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
            <tbody>
              {automobiles.map((automobile: any, index: any) => (
                <tr key={index}>
                  <td>{automobile.manufacturer}</td>
                  <td>{automobile.brand}</td>
                  <td>{automobile.model}</td>
                  <td>{automobile.bodytype}</td>
                  <td>{automobile.prodyear}</td>
                  <td>{automobile.powertype}</td>
                  <td>
                    <Menu>
                      <Menu.Target>
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
                        <Menu.Label>{automobile.name}</Menu.Label>
                        <Menu.Item
                          icon={<Edit2 />}
                          onClick={() => {
                            setSelectedProfileData(automobile);
                            toggleDrawer(true);
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                          icon={<Trash2 />}
                          onClick={() => {
                            setSelectedProfileData(automobile);
                            toggleDrawer(true);
                          }}
                          color="red"
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Test.
        </Text>
      )}

      <div className="flex justify-between my-5">
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
