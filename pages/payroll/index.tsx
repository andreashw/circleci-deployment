import { ScrollArea, Drawer, Text, Table, Button, Menu } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import Router from 'next/router';
import { Edit2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';
import dayjs from 'dayjs';
import { rp } from '@support/formatter';

function PayrollPage() {
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataPayroll } = useSWR('/api/v1/payrolls/');

  const body = () =>
    dataPayroll.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {dayjs(item?.payroll_date).format('ddd, DD MMM YYYY')}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {`${dayjs(item?.start_date).format('ddd, DD MMM YYYY')} - ${dayjs(item?.end_date).format(
            'ddd, DD MMM YYYY'
          )}`}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {rp(item?.total)}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {item?.status}
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
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/payroll/edit/${item.ID}`)}>
                Edit
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
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
          Payroll
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/payroll/add')}>
            Add New Payroll
          </Button>
        </div>
      </div>
      {dataPayroll.length > 0 ? (
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
        <Text className="my-5" align="center" weight="bold">
          Tidak ada data.
        </Text>
      )}
      {/* <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 clients
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div> */}
    </>
  );
}

export default PayrollPage;
