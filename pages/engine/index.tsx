import { useState } from 'react';
import { Table, ScrollArea, Menu, Drawer, Text, Pagination, Button, Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';

import Search from '@components/Forms/Search';
import EditUserForm from '@components/Forms/EditUser';

const MOCKUP_ENGINE: any = [
  {
    name: 'AJ-V6',
    manufacturer: 'Mercedes',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
  {
    name: 'AJ-V6',
    manufacturer: 'Jaguar',
    prodyear: '1950-1980',
    layout: 'V6',
    type: 'Turbocharged',
    fueltype: 'Gasoline',
    transmission: 'AT',
  },
];

export default function Automobile(/*props*/) {
  const [engines, setEngines] = useState(MOCKUP_ENGINE); // props.automobiles
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [activePage, setPage] = useState(1);

  const onSearch = (search: any) => {
    setSearchLoading(true);

    const trimmedSearch = search.toLowerCase().trim();

    if (!trimmedSearch) {
      setEngines(MOCKUP_ENGINE); // props.automobiles
      setSearchLoading(false);
      return;
    }

    const filteredengines = engines.filter(
      (engine: {
        name: string;
        manufacturer: string;
        prodyear: string;
        layout: string;
        type: string;
        fueltype: string;
        transmission: string | any[];
      }) =>
        engine.name.toLowerCase().includes(search) ||
        engine.manufacturer.toLowerCase().includes(search) ||
        engine.prodyear.toLowerCase().includes(search) ||
        engine.layout.toLowerCase().includes(search) ||
        engine.prodyear.includes(search) ||
        engine.type.includes(search) ||
        engine.fueltype.includes(search) ||
        engine.transmission.includes(search)
    );

    setEngines(filteredengines);

    setSearchLoading(false);
  };

  const cancelSearch = () => {
    setEngines(MOCKUP_ENGINE); // props.automobiles
  };

  const onSubmitEditForm = (oldEngine: any, newEngine: any) => {
    toggleDrawer(false);

    // edit data in db

    let tmpengines = engines;
    tmpengines.splice(tmpengines.indexOf(oldEngine), 0, newEngine);
    tmpengines = tmpengines.filter((u: any) => u !== oldEngine);
    setEngines(tmpengines);

    showNotification({
      title: 'Profile',
      message: `${newEngine.manufacturer} Edit Success`,
      color: 'teal',
    });
  };

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={() => toggleDrawer(false)}
        title="Modify Engine"
        padding="xl"
        size="xl"
      >
        <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} />
      </Drawer>

      <div className="p-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Engine
        </Text>
        <div className="flex justify-between">
          <Search loading={searchLoading} onSubmit={onSearch} onCancel={cancelSearch} />
          <Button className="bg-black hover:bg-black px-6">Add New Engine</Button>
        </div>
      </div>

      {MOCKUP_ENGINE.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Engine</th>
                <th>Manufacturer</th>
                <th>Prod. Year</th>
                <th>Layout</th>
                <th>Type</th>
                <th>Fuel Type</th>
                <th>Transmission</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {engines.map((engine: any, index: any) => (
                <tr key={index}>
                  <td>{engine.name}</td>
                  <td>{engine.manufacturer}</td>
                  <td>{engine.prodyear}</td>
                  <td>{engine.layout}</td>
                  <td>{engine.type}</td>
                  <td>{engine.fueltype}</td>
                  <td>{engine.transmission}</td>
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
                        <Menu.Label>{engine.name}</Menu.Label>
                        <Menu.Item
                          icon={<Edit2 />}
                          onClick={() => {
                            setSelectedProfileData(engine);
                            toggleDrawer(true);
                          }}
                        >
                          Edit
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                          icon={<Trash2 />}
                          onClick={() => {
                            setSelectedProfileData(engine);
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
