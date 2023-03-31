/* eslint-disable @typescript-eslint/no-use-before-define */
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { IIncome } from '@contracts/expense-interface';
import useInput from '@hooks/useInput';
import { Button, Center, Drawer, Group, Menu, ScrollArea, Table, Text, UnstyledButton } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { rp } from '@support/formatter';
import { IconChevronDown, IconChevronUp, IconDotsVertical, IconSelector } from '@tabler/icons';
import dayjs from 'dayjs';
import Router from 'next/router';
import { startTransition, useState } from 'react';
import { Edit2, Trash2 } from 'react-feather';
import useSWR from 'swr';

function ExpendPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const [input, handleInput] = useInput({
    search: '',
    type: '',
    start_amound: '',
    end_amound: '',
    selectedId: '',
    start_date: '',
    end_date: '',
    fillter_type: [],
    fillter_project: [],
  });

  const { data: dataIncome, mutate } = useSWR('/api/v1/income/');

  function btnSearch(search: any) {
    startTransition(() => {
      handleInput('search', true)(search);
    });
  }
  // ?sortBy=${input.type}&search=${input.search}&startDate=${
  //     input.start_date ? dayjs(input.start_date).format('YYYY-MM-DD') : ''
  //   }&endDate=${input.end_date ? dayjs(input.end_date).format('YYYY-MM-DD') : ''}&project=&startAmount=${
  //     input.start_amound
  //   }&endAmount=${input.end_amound}

  const onDeleteData = async (incomes: IIncome) => {
    console.log(incomes.ID);

    const response: IIncome | undefined = await fetcher(`/api/v1/income/${incomes.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
  };
  function deleteProfile(incomes: IIncome) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{incomes.Date}</b> Client Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(incomes),
    });
    console.log('====================================');
    // const response: IIncome | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }

  const body = () =>
    dataIncome?.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer  w-72  " onClick={() => Router.push(`/incomes/${item.ID}`)}>
          {item.Project?.Name}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/incomes/${item.ID}`)}>
          {dayjs(item.Date).format('ddd, DD MMMM YYYY')}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/incomes/${item.ID}`)}>
          {item.Category.Name}
        </td>
        <td className="cursor-pointer  w-72  " onClick={() => Router.push(`/incomes/${item.ID}`)}>
          {rp(item.Amount)}
        </td>
        <td className="cursor-pointer  w-72  " onClick={() => Router.push(`/incomes/${item.ID}`)}>
          <p className="w-72 text-ellipsis overflow-hidden whitespace-nowrap">{item.Description}</p>
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
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/incomes/edit/${item.ID}`)}>
                Edit
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  const [sortBy, setSortBy] = useState<any>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  function Urutkan(option: string) {
    console.log(option, reverseSortDirection);
    console.log(sortBy === option);
    setSortBy(option);
    if (option === 'Type') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc1');
        // setSortBy(sortBy);
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('type asc');
        });
      } else {
        console.log(option, 'dsc2');
        setReverseSortDirection((old) => !old);

        startTransition(() => {
          handleInput('type', true)('type desc');
        });
      }
    }

    if (option === 'Project') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('Project.name asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('Project.name desc');
        });
      }
    }
    if (option === 'Date') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('date asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('date desc');
        });
      }
    }
    if (option === 'Amount') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('amount asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('amount desc');
        });
      }
    }
  }

  console.log(input, 'cek');

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Income
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Incomes" onSubmit={btnSearch} />

          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/incomes/add')}>
            Add New Entry
          </Button>
        </div>
        <div className="w-full md:w-[386px] flex-row flex">
          <div className="w-[24px]" />
        </div>
      </div>
      {dataIncome?.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <Th sorted={sortBy === 'Project'} onSort={() => Urutkan('Project')} reversed={reverseSortDirection}>
                  Project
                </Th>
                <Th sorted={sortBy === 'Date'} onSort={() => Urutkan('Date')} reversed={reverseSortDirection}>
                  Date
                </Th>
                <Th sorted={sortBy === 'Type'} onSort={() => Urutkan('Type')} reversed={reverseSortDirection}>
                  Category
                </Th>
                <Th sorted={sortBy === 'Amount'} onSort={() => Urutkan('Amount')} reversed={reverseSortDirection}>
                  Amount
                </Th>
                <th>Description</th>
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

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}
export function Th({ sorted, reversed, children, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className="">
      <UnstyledButton onClick={onSort} className=" min-w-[80px]">
        <Group position="apart" className="flex-row flex flex-nowrap">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}
export default ExpendPage;
