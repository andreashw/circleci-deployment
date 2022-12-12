import { Table, ScrollArea, Text, Button, Popover } from '@mantine/core';

import dayjs from 'dayjs';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import { useRouter } from 'next/router';
import { IReportDaily } from '@contracts/report-daily-interface';
import { fetcher } from '@api/fetcher';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { useState } from 'react';

export default function ReportDaily(/*props*/) {
  const router = useRouter();
  const { data: dataReportDailies } = useSWR('/api/v1/jobs/group');

  const now = dayjs();
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(now.format('DD MMM YYYY')),
    new Date(now.format('DD MMM YYYY')),
  ]);

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
    a.download = 'report-daily.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const body = () =>
    dataReportDailies.map((item: IReportDaily, index: any) => (
      <tr key={index}>
        <td onClick={() => goToDetailPage(item)}>{dayjs(item.date).format('ddd, DD MMM YYYY')}</td>
        <td onClick={() => goToDetailPage(item)}>{item.worker}</td>
        <td onClick={() => goToDetailPage(item)}>{item.department.name}</td>
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

      {dataReportDailies.length > 0 ? (
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

      {/* <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 automobiles
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div> */}
    </>
  );
}
