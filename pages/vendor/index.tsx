import { ScrollArea, Drawer, Text, Table, Menu, Button } from '@mantine/core';
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { IVendor } from '@contracts/vendor-interface';

function VendorPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataVendor, mutate } = useSWR('/api/v1/vendors/');

  const onDeleteData = async (vendor: IVendor) => {
    console.log(vendor.ID);

    const response: IVendor | undefined = await fetcher(`/api/v1/vendors/${vendor.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
  };
  function deleteProfile(vendor: IVendor) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{vendor.name}</b> Client Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(vendor),
    });
    console.log('====================================');
    // const response: IVendor | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }

  const body = () =>
    dataVendor.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/vendor/${item.ID}`)}>
          {item.name}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/vendor/${item.ID}`)}>
          {item.type}
        </td>
        <td className="cursor-pointer  w-72 " onClick={() => Router.push(`/vendor/${item.ID}`)}>
          <p className="truncate w-72">
            {item.Country.name}, {item.address}
          </p>
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/vendor/${item.ID}`)}>
          {item.email}
        </td>

        <td className="cursor-pointer " onClick={() => Router.push(`/vendor/${item.ID}`)}>
          {item.phone}
        </td>
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
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/vendor/edit/${item.ID}`)}>
                Edit Vendor
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete Vendor
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
          Vendor
        </Text>
        <div className="flex justify-between">
          <SearchForm />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/vendor/add')}>
            Add New Vendor
          </Button>
        </div>
      </div>
      {dataVendor.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Country</th>
                <th>Email</th>
                <th>Phone Number</th>
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
      {/* <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 vendor
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div> */}
    </>
  );
}

export default VendorPage;
