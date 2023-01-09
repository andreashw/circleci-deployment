import { Table, ScrollArea, Text, Button, Popover, Pagination, Select } from '@mantine/core';

import dayjs from 'dayjs';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import { useRouter } from 'next/router';
import { IReportDaily } from '@contracts/report-daily-interface';
import { fetcher } from '@api/fetcher';
import { DatePicker } from '@mantine/dates';
import useInput from '@hooks/useInput';
import { useTransition } from 'react';
import { showNotification } from '@mantine/notifications';

export default function ReportDaily(/*props*/) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [input, handleInput] = useInput({
    page: 1,
    search: '',
    start_date: '',
    end_date: '',
    limit: '100',
  });
  const { data: dataReportDailies } = useSWR(
    `/api/v1/jobs/group?page=${input.page}&search=${input.search}&start_date=${
      input.start_date ? dayjs(input.start_date).format('YYYY-MM-DD') : ''
    }&end_date=${input.end_date ? dayjs(input.end_date).format('YYYY-MM-DD') : ''}&limit=${input?.limit}`
  );

  function btnSearch(search: any) {
    startTransition(() => {
      handleInput('search', true)(search);
    });
  }

  const goToDetailPage = (item: any) => {
    router.push({
      pathname: `/jobreport/daily/${item.worker_id}`,
      query: { worker_id: item.worker_id, date: item.date },
    });
    // Jangan diubah ke URL custom karena jika diubah maka query di halaman selanjutnya jika di refresh akan hilang
  };

  const goToAddReport = () => {
    router.push({
      pathname: '/jobreport/add',
      query: { report: 'daily' },
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

  const body = () =>
    dataReportDailies?.data?.map((item: IReportDaily, index: any) => (
      <tr key={index}>
        <td onClick={() => goToDetailPage(item)}>{dayjs(item.date).format('ddd, DD MMM YYYY')}</td>
        <td onClick={() => goToDetailPage(item)}>{item.worker}</td>
        <td onClick={() => goToDetailPage(item)}>{item.department}</td>
      </tr>
    ));

  function setPage(page: any) {
    startTransition(() => {
      handleInput('page', true)(page);
    });
  }
  function onChangeSelectLimit(limit: any) {
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
              Job Report Daily
            </Text>
            <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
              <SearchForm searchName="Job Report Hourly" onSubmit={btnSearch} />
              <Button className="bg-black hover:bg-black px-6" onClick={() => goToAddReport()}>
                Add New Job Report
              </Button>
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

      {dataReportDailies?.data?.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th className="w-80">Date</th>
                <th className="w-[400px]">Worker</th>
                <th className="w-[400px]">Department</th>
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
                { value: '100', label: '100' },
                { value: '500', label: '500' },
                { value: '1000', label: '1000' },
              ]}
              onChange={onChangeSelectLimit}
            />
          </div>
          <Text color="#828282" size={14}>
            Show {dataReportDailies?.data_per_page} from {dataReportDailies?.total_data} jobreport Daily
          </Text>
        </div>
        <Pagination page={dataReportDailies?.current_page} onChange={setPage} total={dataReportDailies?.total_page} />
      </div>
    </>
  );
}
