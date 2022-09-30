import { Table, ScrollArea, Menu, Text, Button, Divider } from '@mantine/core';

import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';

import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import { useRouter } from 'next/router';
import { IReportHourly } from '@contracts/report-hourly-interface';
import dayjs from 'dayjs';

export default function ReportHourly(/*props*/) {
  const router = useRouter();
  const { data: dataReportHourly } = useSWR('/api/v1/jobs/');

  const goToAddReport = () => {
    router.push({
      pathname: '/jobreport/add',
      query: { report: 'hourly' },
    });
  };

  const body = () =>
    dataReportHourly.map((item: IReportHourly, index: any) => (
      <tr key={index}>
        <td onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}>
          {dayjs(item.date).format('ddd, DD MMM YYYY')}
        </td>
        <td onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}>{item.Worker.name}</td>
        <td onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}>{item.Project.name}</td>
        <td onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}>{item.department_id}</td>
        <td onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}>{item.start_hour}</td>
        <td onClick={() => router.push(`/jobreport/hourly/${item.ID}`)}>{item.task}</td>
        <td>
          <Menu>
            <Menu.Target>
              {/* <Button variant="white" color={'red'}>Action</Button> */}
              <div className="flex content-center items-center w-6 h-9 cursor-pointer">
                <IconDotsVertical size={14} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{item.Worker.name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => console.log('Flow Edit belum ada')}>
                Edit
              </Menu.Item>
              <Divider />
              <Menu.Item icon={<Trash2 />} onClick={() => console.log('Flow Delete belum ada')} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  return (
    <>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Job Report Hourly
        </Text>
        <div className="flex justify-between">
          <SearchForm searchName="Job Report Hourly " />
          <Button className="bg-black hover:bg-black px-6" onClick={() => goToAddReport()}>
            Add New Job Report
          </Button>
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
