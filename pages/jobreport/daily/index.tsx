import { Table, ScrollArea, Text, Button } from '@mantine/core';

import dayjs from 'dayjs';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import { useRouter } from 'next/router';
import { IReportDaily } from '@contracts/report-daily-interface';

export default function ReportDaily(/*props*/) {
  const router = useRouter();
  const { data: dataReportDailies } = useSWR('/api/v1/jobs/group');

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

  const body = () =>
    dataReportDailies.map((item: IReportDaily, index: any) => (
      <tr key={index}>
        <td onClick={() => goToDetailPage(item)}>{dayjs(item.date).format('ddd, DD MMM YYYY')}</td>
        <td onClick={() => goToDetailPage(item)}>{item.worker}</td>
        <td onClick={() => goToDetailPage(item)}>{item.department}</td>
      </tr>
    ));

  return (
    <>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Job Report Daily
        </Text>
        <div className="flex justify-between">
          <SearchForm searchName="Job Report Daily " />
          <Button className="bg-black hover:bg-black px-6" onClick={() => goToAddReport()}>
            Add New Job Report
          </Button>
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
        <Text align="center" weight="bold">
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
