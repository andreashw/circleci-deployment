/* eslint-disable @typescript-eslint/no-use-before-define */
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import ModalFilter from '@components/modal/Filter';
import { IExpense } from '@contracts/expense-interface';
import { IReportHourly } from '@contracts/report-hourly-interface';
import useInput from '@hooks/useInput';
import {
  Button,
  Center,
  Drawer,
  Tooltip,
  Checkbox,
  Group,
  Menu,
  Popover,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
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
  const [SelectBTNBool, setSelectBTNBool] = useState(true);
  const [checkedBTNBool, setCheckedBTNBool] = useState(false);

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
  const setStart_Date = `${parseInt(dayjs(Date.now()).format('YYYY'), 10) - 1}-${dayjs(Date.now()).format('MM-DD')}`;

  const setEnd_Date = `${parseInt(dayjs(Date.now()).format('YYYY'), 10) + 1}-${dayjs(Date.now()).format('MM-DD')}`;

  const { data: dataExpense, mutate } = useSWR(
    `/api/v1/expense/?startDate=${
      input.start_date ? dayjs(input.start_date).format('YYYY-MM-DD') : setStart_Date
    }&endDate=${
      input.end_date ? dayjs(input.end_date).format('YYYY-MM-DD') : setEnd_Date
    }&project=${input.fillter_project.flat()}&startAmount=${input.start_amound}&endAmount=${input.end_amound}&sortBy=${
      input.type
    }&search=${input.search}&types=${input.fillter_type.flat()}`
  );

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

  const onDeleteData = async (expenses: IExpense) => {
    console.log(expenses.ID);

    const response: IExpense | undefined = await fetcher(`/api/v1/expense/${expenses.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
  };
  function deleteProfile(expenses: IExpense) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{expenses.Date}</b> Client Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(expenses),
    });
    console.log('====================================');
    // const response: IExpense | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }

  const body = () =>
    dataExpense?.map((item: any, index: any) => (
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
          <p className="w-72 text-ellipsis overflow-hidden whitespace-nowrap">{item.Description}</p>
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

  const exportXls = async () => {
    const response: any = await fetcher(
      '/api/v1/expense/export',
      {
        method: 'GET',
      },
      true
    );

    const blob = new Blob([response], {
      type: 'text/plain',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = 'expenses.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
          handleInput('type', true)('project_id asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('type', true)('project_id desc');
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

  const [opened, setOpened] = useState(false);
  const [idSpec, setIdspec] = useState<any>([]);

  const doDeleteMultiple = async () => {
    await fetcher('/api/v1/expense/mass', {
      method: 'DELETE',
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      body: { ids: idSpec },
    })
      .then((res: IReportHourly | any) => {
        showNotification({
          title: 'Success',
          message: res?.Message,
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
          message: err?.Message,
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
          Expense
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Expenses" onSubmit={btnSearch} />
          <ModalFilter
            opened={opened}
            handleClosed={() => setOpened(false)}
            input={input}
            handleInput={handleInput}
            title="Filter Expenses"
          />
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
            <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/expenses/add')}>
              Add New Expense
            </Button>
          )}
        </div>
        <div className="w-full md:w-[386px] flex-row flex">
          <Button className="bg-black hover:bg-black w-1/2 px-6" onClick={() => setOpened(true)}>
            Filter
          </Button>
          <div className="w-[24px]" />
          <div className="w-1/2  h-20">
            <div
              className="cursor-pointer bg-black items-center justify-center h-[36px] px-6  rounded "
              style={{
                display: 'flex',
              }}
            >
              <Popover withArrow>
                <Popover.Target>
                  <Text className="text-white text-center" weight={600} size={14}>
                    Export
                  </Text>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text onClick={() => exportXls()} size="sm" className="cursor-pointer min-w-[54px] py-1">
                    Xls
                  </Text>
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      {dataExpense?.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                {' '}
                {!SelectBTNBool && (
                  <th className="w-8">
                    <Tooltip label="Select All">
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onChange={(e) => {
                          const currentPageIds = dataExpense.map((x: any) => x.ID);
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
                <Th sorted={sortBy === 'Date'} onSort={() => Urutkan('Date')} reversed={reverseSortDirection}>
                  Date
                </Th>
                <Th sorted={sortBy === 'Type'} onSort={() => Urutkan('Type')} reversed={reverseSortDirection}>
                  Type
                </Th>
                <Th sorted={sortBy === 'Amount'} onSort={() => Urutkan('Amount')} reversed={reverseSortDirection}>
                  Amount
                </Th>
                <th>Description</th>
                <Th sorted={sortBy === 'Project'} onSort={() => Urutkan('Project')} reversed={reverseSortDirection}>
                  Project
                </Th>
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
        <Group position="apart">
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
