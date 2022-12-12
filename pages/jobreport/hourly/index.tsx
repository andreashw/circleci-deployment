import { Table, ScrollArea, Menu, Text, Button, Divider, Popover } from '@mantine/core';

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
import { useEffect, useTransition, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import Lock from 'icons/Lock';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';

export default function ReportHourly(/*props*/) {
  const router = useRouter();
  const modals = useModals();

  const [, startTransition] = useTransition();
  const [input, handleInput] = useInput({
    selectedId: '',
  });

  const { data: dataReportHourly, mutate } = useSWR('/api/v1/jobs/');
  const { data: dataSelected } = useSWR<IReportHourly>(
    input.selectedId !== '' ? `/api/v1/jobs/${input.selectedId}` : null
  );

  const now = dayjs();
  const [value, setValue] = useState<DateRangePickerValue>([now.toDate(), now.toDate()]);

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
    // Contoh konversi data tanggal untuk call API database
    // console.log(dayjs(value[0]).format('YYYY-MM-DD'));

    const response: any = await fetcher(
      `/api/v1/jobs/export?start_date=${dayjs(value[0]).format('YYYY-MM-DD')}&end_date=${dayjs(value[1]).format(
        'YYYY-MM-DD'
      )}`,
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
    a.download = 'report-hourly.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const body = () =>
    dataReportHourly.map((item: IReportHourly, index: any) => (
      <tr key={index}>
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

  return (
    <>
      <div className="px-6 pt-6 mb-6">
        <div>
          <div>
            <Text align="left" weight="bold" mb="xs" size="xl">
              Job Report Hourly
            </Text>
            <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
              <SearchForm searchName="Job Report Hourly" hidden />
              <Button className="bg-black hover:bg-black px-6" onClick={() => goToAddReport()}>
                Add New Job Report
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center flex-col sm:flex-row pb-4 sm:pb-0">
              <div className="min-w-[384px]">
                <div className="flex w-full">
                  <DateRangePicker
                    placeholder="Pick dates range"
                    inputFormat="DD MMMM YYYY"
                    labelFormat="DD MMMM YYYY"
                    value={value}
                    onChange={setValue}
                  />
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

      {dataReportHourly.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
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

      {/* <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 automobiles
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div> */}
    </>
  );
}
