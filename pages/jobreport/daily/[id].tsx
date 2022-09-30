import ErrorBoundary from '@components/ErrorBoundary';
import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IReportDetailDaily, ITask } from '@contracts/report-detail-daily-interface';
import { Divider, Grid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import Router, { useRouter } from 'next/router';
import { Fragment, Suspense } from 'react';
import useSWR from 'swr';

function Detail() {
  const router = useRouter();
  const { date, worker_id } = router.query;
  const { data } = useSWR<IReportDetailDaily>(`/api/v1/jobs/group/${worker_id}/${date}`);

  return (
    <>
      <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <div className="pr-5 cursor-pointer" onClick={() => Router.back()}>
          {'<'}
        </div>
        <Text className="cursor-pointer" align="left" weight="bold" size="xl">
          Detail Job Report
        </Text>
      </div>
      <div className="mx-5">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl">
          <ListDetail List="Date" IsiList={dayjs(data?.Date).format('ddd, DD MMM YYYY')} />
          <ListDetail List="Worker" IsiList={data?.Worker} />
        </Grid>
        <Divider my="sm" className="my-5" />

        {/* TASKS SECTION */}
        {data
          ? data?.Tasks &&
            data?.Tasks.map((task: ITask, ti: number) => (
              <Fragment key={ti}>
                <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
                  Task
                </Text>
                <Grid gutter="xl">
                  <ListDetail List="Hour" IsiList={`${task.Hours}`} />
                  <ListDetail List="Total Hour" IsiList={`${task.TotalHours}`} />
                  <ListDetail List="Project" IsiList={`${task.Project}`} />
                  <ListDetail List="Job" IsiList={`${task.Job}`} />
                  <ListDetail List="Status Kerja" IsiList={`${task.Status}`} />
                  <ListDetail List="Task" IsiList={`${task.Task}`} />
                </Grid>
                <Divider my="sm" className="my-5" />
              </Fragment>
            ))
          : undefined}
      </div>
    </>
  );
}
function DetailHourly(/*props*/) {
  return (
    <>
      <HeadingTop items={[{ title: 'Job Report', href: '/jobreport/daily' }, { title: 'Detail Reports' }]} />
      <ErrorBoundary fallback={<div>Something Wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Detail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default DetailHourly;
