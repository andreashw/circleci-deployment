import {
  Table,
  ScrollArea,
  Menu,
  Text,
  Button,
  Divider,
  Popover,
  Pagination,
  Select,
  Checkbox,
  Tooltip,
} from '@mantine/core';

import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';

import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import { useRouter } from 'next/router';
import { IReportHourly } from '@contracts/report-hourly-interface';
import dayjs from 'dayjs';
import { fetcher } from '@api/fetcher';
import { useModals } from '@mantine/modals';
import useInput from '@hooks/useInput';
import { useEffect, useState, useTransition } from 'react';
import { showNotification } from '@mantine/notifications';
import Lock from 'icons/Lock';
import { DatePicker } from '@mantine/dates';

export default function ReportHourly(/*props*/) {
  const router = useRouter();
  const modals = useModals();

  const [idSpec, setIdspec] = useState<any>([]);
  const [idSpecPage, setIdspecPage] = useState<any>([]);
  const [SelectBTNBool, setSelectBTNBool] = useState(true);
  const [checkedBTNBool, setCheckedBTNBool] = useState(false);

  const setStart_Date = `${parseInt(dayjs(Date.now()).format('YYYY'), 10) - 5}-${dayjs(Date.now()).format('MM-DD')}`;

  const setEnd_Date = `${parseInt(dayjs(Date.now()).format('YYYY'), 10) + 5}-${dayjs(Date.now()).format('MM-DD')}`;

  const [, startTransition] = useTransition();
  const [input, handleInput] = useInput({
    page: 1,
    search: '',
    selectedId: '',
    start_date: '',
    end_date: '',
    limit: '100',
  });

  const { data: dataReportHourly, mutate } = useSWR(
    `/api/v1/jobs/?page=${input.page}&search=${input.search}&start_date=${
      input.start_date ? dayjs(input.start_date).format('YYYY-MM-DD') : setStart_Date
    }&end_date=${input.end_date ? dayjs(input.end_date).format('YYYY-MM-DD') : setEnd_Date}&limit=${input.limit}`
  );
  const { data: dataSelected } = useSWR<IReportHourly>(
    input.selectedId !== '' ? `/api/v1/jobs/${input.selectedId}` : null
  );

  useEffect(() => {
    if (dataSelected) {
      if (dataSelected?.title === 'Editable') {
        router.push(`/jobreport/hourly/edit/${Number(dataSelected.ID)}`);
      } else {
        showNotification({
          title: 'Warning',
          message: dataSelected?.message,
          color: 'teal',
        });
      }
    }
  }, [dataSelected]);

  const goToAddReport = () => {
    router.push({
      pathname: '/jobreport/add',
      query: { report: 'hourly' },
    });
  };

  const onDeleteData = async (item: IReportHourly) => {
    const response: IReportHourly | undefined = await fetcher(`/api/v1/jobs/${item.ID}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (response?.title === 'Not Deletable') {
      showNotification({
        title: 'Delete Failed',
        message: response?.message,
        color: 'red',
      });
    } else if (response?.title === 'Deletable') {
      showNotification({
        title: 'Delete Success',
        message: response?.message,
        color: 'teal',
      });
      mutate();
    } else {
      showNotification({
        title: 'Error',
        message: 'Oops! something went wrong.',
        color: 'red',
      });
    }
  };

  const doDeleteMultiple = async () => {
    await fetcher('/api/v1/jobs/mass', {
      method: 'DELETE',
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      body: { ids: idSpec },
    })
      .then((res: IReportHourly | any) => {
        showNotification({
          title: 'Success',
          message: res?.message,
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
          message: err?.message,
          color: 'red',
        });
      });
  };

  const deleteData = (item: IReportHourly) => {
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Apakah Anda yakin menghapus ini?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(item),
    });
  };

  const checkEditable = (item: IReportHourly) => {
    startTransition(() => {
      handleInput('selectedId', true)(item.ID);
    });
  };

  const exportXls = async () => {
    let callApi = '';

    if (input.start_date === '') {
      showNotification({
        title: 'Alert',
        message: 'Please fill start date',
        color: 'red',
      });
    } else {
      if (input.end_date === '') {
        callApi = `/api/v1/jobs/export?start_date=${dayjs(input.start_date).format('YYYY-MM-DD')}&end_date=${dayjs(
          input.start_date
        ).format('YYYY-MM-DD')}`;
      } else {
        callApi = `/api/v1/jobs/export?start_date=${dayjs(input.start_date).format('YYYY-MM-DD')}&end_date=${dayjs(
          input.end_date
        ).format('YYYY-MM-DD')}`;
      }

      const response: any = await fetcher(
        callApi,
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
      a.download = 'report-daily.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  function setPage(page: any) {
    startTransition(() => {
      handleInput('page', true)(page);
    });
  }

  console.log('====================================');
  console.log(idSpec);
  console.log(idSpecPage);
  console.log('====================================');
  // function cektesdata() {
  //   const dataA = dataReportHourly.data
  //     ?.filter((x: any) => x.paid === false)
  //     ?.reduce((prev: any[], curr: { ID: any }) => {
  //       // eslint-disable-next-line no-param-reassign
  //       prev = [...prev, curr.ID];
  //       return prev;
  //     }, []);
  //   console.log(dataA, 'cek tes');
  // }
  const body = () =>
    dataReportHourly.data.map((item: IReportHourly, index: any) => (
      <tr key={index}>
        {!SelectBTNBool && (
          <td className="w-8">
            <Checkbox
              disabled={item.paid}
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
        <td
          onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}
          style={{ color: item.paid === true ? '#828282' : 'black' }}
        >
          {dayjs(item.date).format('ddd, DD MMM YYYY')}
        </td>
        <td
          onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}
          style={{ color: item.paid === true ? '#828282' : 'black' }}
        >
          {item.Worker.name}
        </td>
        <td
          onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}
          style={{ color: item.paid === true ? '#828282' : 'black' }}
        >
          {item.Project.name}
        </td>
        <td
          onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}
          style={{ color: item.paid === true ? '#828282' : 'black' }}
        >
          {item.Department.name}
        </td>
        <td
          onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}
          style={{ color: item.paid === true ? '#828282' : 'black' }}
        >
          {item.start_hour}
        </td>
        <td
          onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}
          style={{ color: item.paid === true ? '#828282' : 'black' }}
        >
          {item.task}
        </td>
        <td>
          {item.paid === true ? (
            <div className="flex content-center items-center w-6 h-9">
              <Lock color="#828282" width="20" height="20" />
            </div>
          ) : (
            <Menu>
              <Menu.Target>
                <div className="flex content-center items-center w-6 h-9 cursor-pointer">
                  <IconDotsVertical size={14} />
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{item.Worker.name}</Menu.Label>
                <Menu.Item icon={<Edit2 />} onClick={() => checkEditable(item)}>
                  Edit
                </Menu.Item>
                <Divider />
                <Menu.Item icon={<Trash2 />} onClick={() => deleteData(item)} color="red">
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </td>
      </tr>
    ));

  function btnSearch(search: any) {
    startTransition(() => {
      handleInput('search', true)(search);
    });
  }
  function onChangeSelectLimit(limit: any) {
    handleInput('page', true)('1');
    setIdspecPage([]);
    startTransition(() => {
      handleInput('limit', true)(limit);
    });
  }

  return (
    <>
      <div className="px-6 pt-6 mb-6">
        <div>
          <div>
            <Text align="left" weight="bold" mb="xs" size="xl">
              Job Report Hourly
            </Text>
            <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
              <SearchForm searchName="Job Report Hourly" onSubmit={btnSearch} />
              {SelectBTNBool ? (
                <Button className="bg-black hover:bg-black px-6 mx-3" onClick={() => setSelectBTNBool(!SelectBTNBool)}>
                  Select
                </Button>
              ) : (
                <>
                  <Button
                    className="bg-black hover:bg-black px-6 mx-3"
                    onClick={() => setSelectBTNBool(!SelectBTNBool)}
                  >
                    Cencel
                  </Button>
                  <Button className="bg-black hover:bg-black px-6" onClick={() => doDeleteMultiple()}>
                    Delete
                  </Button>
                </>
              )}
              {SelectBTNBool && (
                <Button className="bg-black hover:bg-black px-6" onClick={() => goToAddReport()}>
                  Add New Job Report
                </Button>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center flex-col sm:flex-row pb-4 sm:pb-0">
              <div>
                <div className="flex w-full">
                  <div className="w-[178px]">
                    <DatePicker
                      placeholder="Start Date"
                      value={input.start_date}
                      onChange={(v) => {
                        startTransition(() => {
                          handleInput('start_date', true)(v);
                        });
                      }}
                    />
                  </div>
                  <p className="p-3">-</p>
                  <div className="w-[178px]">
                    <DatePicker
                      value={input.end_date}
                      onChange={(v) => {
                        startTransition(() => {
                          handleInput('end_date', true)(v);
                        });
                      }}
                      placeholder="End Date"
                    />
                  </div>
                </div>
              </div>
              <div
                className="cursor-pointer bg-black items-center h-[36px] px-6 mr-4 rounded ml-3"
                style={{
                  display: 'flex',
                }}
              >
                <Popover withArrow>
                  <Popover.Target>
                    <Text className="text-white" weight={600} size={14}>
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
      </div>

      {dataReportHourly.data?.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
                {!SelectBTNBool && (
                  <th className="w-8">
                    <Tooltip label="Select All">
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onChange={(e) => {
                          const currentPageIds = dataReportHourly.data
                            .filter((x: any) => !x.paid)
                            .map((x: any) => x.ID);
                          if (idSpecPage.includes(input.page)) {
                            setIdspec((prev: any) => prev.filter((id: any) => !currentPageIds.includes(id)));
                            setIdspecPage(idSpecPage.filter((x: number) => x !== parseInt(input.page, 10)));
                            setCheckedBTNBool(!checkedBTNBool);
                          } else {
                            setIdspec((prev: any) => [...prev, ...currentPageIds]);
                            setIdspecPage([...idSpecPage, parseInt(input.page, 10)]);

                            setCheckedBTNBool(!checkedBTNBool);
                          }
                        }}
                        checked={idSpecPage.includes(parseInt(input.page, 10))}
                      />
                    </Tooltip>
                  </th>
                )}
                <th className="w-44">Date</th>
                <th className="w-[120px]">Worker</th>
                <th className="w-[120px]">Project</th>
                <th>Department</th>
                <th>Hour</th>
                <th>Task</th>
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

      <div className="flex justify-between my-5 p-6">
        <div className="flex-row flex items-center">
          <div className="w-28 mr-8">
            <Select
              // rightSection={<RightSection />}
              value={input?.limit}
              data={[
                { value: '3', label: '3' },
                { value: '500', label: '500' },
                { value: '1000', label: '1000' },
              ]}
              onChange={onChangeSelectLimit}
            />
          </div>
          <Text color="#828282" size={14}>
            Show {dataReportHourly?.data_per_page} from {dataReportHourly?.total_data} jobreport hourly
          </Text>
        </div>
        <Pagination page={dataReportHourly?.current_page} onChange={setPage} total={dataReportHourly?.total_page} />
      </div>
    </>
  );
}
