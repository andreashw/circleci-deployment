import ErrorBoundary from '@components/ErrorBoundary';
import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IEngineer } from '@contracts/enginers-interface';
import { Divider, Grid, Text } from '@mantine/core';
import { rp } from '@support/formatter';
import dayjs from 'dayjs';
import Router, { useRouter } from 'next/router';
import { Fragment, Suspense } from 'react';
import useSWR from 'swr';

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IEngineer[]>(`/api/v1/workers/${id}`);

  return (
    <>
      <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <div className="pr-5 cursor-pointer" onClick={Router.back}>
          {'<'}
        </div>
        <Text className="cursor-pointer" align="left" weight="bold" size="xl">
          Engineer
        </Text>
      </div>
      <div className="mx-5">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          General
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Name" IsiList={data?.[0]?.name} />
          <ListDetail List="Phone Number" IsiList={data?.[0]?.phone} />
        </Grid>
        <Divider my="sm" className="my-5" />

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Account Information
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Bank" IsiList={data?.[0]?.bank_name} />
          <ListDetail List="Rekening" IsiList={data?.[0]?.account_number} />
          <ListDetail List="Nama Pemilik Rek." IsiList={data?.[0]?.account_name} />
        </Grid>
        <Divider my="sm" className="my-5" />

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Salary
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Hourly Pay" IsiList={rp(data?.[0]?.hourly_pay)} />
          <ListDetail List="Bulanan Equiv." IsiList={rp(data?.[0]?.monthly_pay)} />
        </Grid>
        <Divider my="sm" className="my-5" />

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Notes
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Tanggal Masuk" IsiList={dayjs(data?.[0]?.first_work_date).format('ddd, DD MMM YYYY')} />
          <ListDetail List="Notes" IsiList={data?.[0]?.note} />
        </Grid>
      </div>
    </>
  );
}
function DetailEngineer(/*props*/) {
  return (
    <>
      <HeadingTop items={[{ title: 'Engineer', href: '/engineer' }, { title: 'Detail Engineer' }]} />
      <ErrorBoundary fallback={<div>Something Wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Detail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default DetailEngineer;
