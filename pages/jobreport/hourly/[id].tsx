import ErrorBoundary from '@components/ErrorBoundary';
import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IReportHourly } from '@contracts/report-hourly-interface';
import { Grid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import Router, { useRouter } from 'next/router';
import { Fragment, Suspense } from 'react';
import useSWR from 'swr';

function Detail() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data } = useSWR<IReportHourly>(`/api/v1/jobs/${id}`);

  return (
    <>
      <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        {/* <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'red' }}> */}
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
          <ListDetail List="Worker" IsiList={data?.Worker.Name} />
          <ListDetail List="Status Kerja" IsiList={data?.Status} />
          <ListDetail List="Project" IsiList={data?.Project.Name} />
          <ListDetail List="Department" IsiList={data?.Department.Name} />
          <ListDetail List="Hour" IsiList={data?.StartHour} />
          <ListDetail List="Job" IsiList={data?.JobDescription} />
          <ListDetail List="Task" IsiList={data?.Task} />
        </Grid>
      </div>
    </>
  );
}
function DetailHourly(/*props*/) {
  return (
    <>
      <HeadingTop items={[{ title: 'Job Report', href: '/jobreport/hourly' }, { title: 'Detail Reports' }]} />
      <ErrorBoundary fallback={<div>Something Wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Detail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default DetailHourly;
