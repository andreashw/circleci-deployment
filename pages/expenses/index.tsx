import { ScrollArea, Drawer, Text, Table, Menu, Button } from '@mantine/core';
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import dayjs from 'dayjs';
import { rp } from '@support/formatter';
import { IExpense } from '@contracts/expense-interface';

function ExpendPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataExpense, mutate } = useSWR('/api/v1/expense/', { suspense: false });

  const onDeleteData = async (client: IExpense) => {
    console.log(client.ID);

    const response: IExpense | undefined = await fetcher(`/api/v1/expense/${client.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
  };
  function deleteProfile(client: IExpense) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{client.Date}</b> Client Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(client),
    });
    console.log('====================================');
    // const response: IExpense | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }

  const body = () =>
    dataExpense?.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/expenses/${item.ID}`)}>
          {dayjs(item.Date).format('ddd, DD MMMM YYYY')}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/expenses/${item.ID}`)}>
          {item.Type}
        </td>
        <td className="cursor-pointer  w-72  " onClick={() => Router.push(`/expenses/${item.ID}`)}>
          {rp(item.Amount)}
        </td>
        <td className="cursor-pointer  w-72  " onClick={() => Router.push(`/expenses/${item.ID}`)}>
          {item.Project?.Name}
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
              <Menu.Label>{item.Name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/expenses/edit/${item.ID}`)}>
                Edit Expense
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete Expense
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
          Expense
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Automobile" />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/expenses/add')}>
            Add New Expense
          </Button>
        </div>
      </div>
      {dataExpense?.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Project</th>
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

export default ExpendPage;
