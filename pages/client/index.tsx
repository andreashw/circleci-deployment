import { ScrollArea, Pagination, Drawer, Text, Table, Menu } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import Search from '@components/Forms/Search';
import { showNotification } from '@mantine/notifications';
import EditUserForm from '@components/Forms/EditUser';
import { Edit2 } from 'react-feather';

const MOCKUP_CLIENTS: any = [
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
  {
    Name: 'Ronald Richards',
    Email: 'ronaldrichards@gmail.com',
    Address: '4140 Parker Rd. Allentown, New Mexico 31134',
    PhoneNumber: '(319) 555-0115',
  },
];

function Clients() {
  const [clients, setClients] = useState(MOCKUP_CLIENTS);
  const [drawerOpened, toggleDrawer] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState({});
  const [activePage, setPage] = useState(1);

  useEffect(
    () =>
      setTableRows(
        clients.map((automobile: any, index: any) => (
          <tr key={index}>
            <td>{automobile.Name}</td>
            <td>{automobile.Email}</td>
            <td>{automobile.Address}</td>
            <td>{automobile.PhoneNumber}</td>
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
    [clients]
  );

  const cancelSearch = () => {
    setClients(MOCKUP_CLIENTS); // props.clients
  };
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

  const onSearch = (search: any) => {
    setSearchLoading(true);

    const trimmedSearch = search.toLowerCase().trim();

    if (!trimmedSearch) {
      setClients(MOCKUP_CLIENTS); // props.clients
      setSearchLoading(false);
      return;
    }

    const filteredautomobiles = clients.filter(
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

    setClients(filteredautomobiles);

    setSearchLoading(false);
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
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th />
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
          Show 10 from 1020 clients
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div>
    </>
  );
}

export default Clients;
