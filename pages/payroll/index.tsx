import { ScrollArea, Drawer, Text, Table, Button, Menu, Checkbox, Tooltip } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import Router from 'next/router';
import { Edit2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';
import dayjs from 'dayjs';
import { rp } from '@support/formatter';
import { showNotification } from '@mantine/notifications';
import { fetcher } from '@api/fetcher';

function PayrollPage() {
  const [drawerOpened, toggleDrawer] = useState(false);

  const [idSpec, setIdspec] = useState<any>([]);
  const [SelectBTNBool, setSelectBTNBool] = useState(true);
  const [checkedBTNBool, setCheckedBTNBool] = useState(false);

  const { data: dataPayroll, mutate } = useSWR('/api/v1/payrolls/');
  console.log('tes id', idSpec);

  const body = () =>
    dataPayroll.map((item: any, index: any) => (
      <tr key={index}>
        {!SelectBTNBool && (
          <td className="w-8">
            <Checkbox
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChange={(e) => {
                if (idSpec.includes(item?.ID)) {
                  setIdspec(idSpec.filter((id: number) => id !== item?.ID));
                } else {
                  setIdspec([...idSpec, item.ID]);
                }
              }}
              checked={idSpec.includes(item.ID)}
            />
          </td>
        )}
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {dayjs(item?.PayrollDate).format('ddd, DD MMM YYYY')}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {`${dayjs(item?.StartDate).format('ddd, DD MMM YYYY')} - ${dayjs(item?.EndDate).format('ddd, DD MMM YYYY')}`}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {rp(item?.Total)}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => Router.push(`/payroll/${item.ID}`)}>
          {item?.Status}
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
  const doDeleteMultiple = async () => {
    await fetcher('/api/v1/payrolls/', {
      method: 'DELETE',
      body: { ids: idSpec },
    })
      .then((res: any) => {
        console.log(res, 'cek');

        showNotification({
          title: 'Success',
          message: res.message,
          color: 'teal',
        });
        setCheckedBTNBool(false);
        setIdspec([]);
        setSelectBTNBool(!SelectBTNBool);
        mutate();
      })
      .catch((err) => {
        showNotification({
          title: 'Error',
          message: err.message,
          color: 'red',
        });
      });
  };

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
          {SelectBTNBool ? (
            <>
              <Button className="bg-black hover:bg-black px-6 " onClick={() => setSelectBTNBool(!SelectBTNBool)}>
                Select
              </Button>
              <div id="gap" className="h-6 md:w-6" />
            </>
          ) : (
            <>
              <Button className="bg-black hover:bg-black px-6 " onClick={() => setSelectBTNBool(!SelectBTNBool)}>
                Cancel
              </Button>
              <div id="gap" className="h-6 md:w-6" />
              <Button className="bg-black hover:bg-black px-6" onClick={() => doDeleteMultiple()}>
                Delete
              </Button>
            </>
          )}
          {SelectBTNBool && (
            <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/payroll/add')}>
              Add New Entry
            </Button>
          )}
        </div>
      </div>
      {dataPayroll.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                {!SelectBTNBool && (
                  <th className="w-8">
                    <Tooltip label="Select All">
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onChange={(e) => {
                          const currentPageIds = dataPayroll.map((x: any) => x.ID);
                          if (checkedBTNBool) {
                            setIdspec((prev: any) => prev.filter((id: any) => !currentPageIds.includes(id)));
                            setCheckedBTNBool(!checkedBTNBool);
                          } else {
                            setIdspec((prev: any) => [...prev, ...currentPageIds]);

                            setCheckedBTNBool(!checkedBTNBool);
                          }
                        }}
                        checked={checkedBTNBool}
                      />
                    </Tooltip>
                  </th>
                )}
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
