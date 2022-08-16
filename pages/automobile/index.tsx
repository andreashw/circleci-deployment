import { useState, useEffect } from 'react';
import { Table, ScrollArea, Menu, Drawer, Text, Pagination } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { Edit2 } from 'react-feather';
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
  const [tableRows, setTableRows] = useState([]);
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [activePage, setPage] = useState(1);

  useEffect(
    () =>
      setTableRows(
        automobiles.map((automobile: any, index: any) => (
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
        ))
      ),
    [automobiles]
  );

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

      <Search loading={searchLoading} onSubmit={onSearch} onCancel={cancelSearch} />

      {tableRows.length > 0 ? (
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
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
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
