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
  const { data } = useSWR<IReportHourly[]>(`/api/v1/jobs/${id}`);

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
          <ListDetail List="Date" IsiList={dayjs(data?.[0]?.date).format('ddd, DD MMM YYYY')} />
          <ListDetail List="Worker" IsiList={data?.[0]?.Worker.name} />
          <ListDetail List="Status Kerja" IsiList={data?.[0]?.status} />
          <ListDetail List="Project" IsiList={data?.[0]?.Project.name} />
          <ListDetail List="Department" IsiList={data?.[0]?.department_id as unknown as string} />
          <ListDetail List="Hour" IsiList={data?.[0]?.start_hour} />
          <ListDetail List="Job" IsiList={data?.[0]?.job_description} />
          <ListDetail List="Task" IsiList={data?.[0]?.task} />
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
