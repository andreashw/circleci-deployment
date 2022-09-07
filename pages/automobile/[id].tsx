import ErrorBoundary from '@components/ErrorBoundary';
import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IAutomobile } from '@contracts/automobile-interface';
import { Grid, Text } from '@mantine/core';
import Router, { useRouter } from 'next/router';
import { Suspense } from 'react';
import useSWR from 'swr';

function DetailAutoMobile() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data } = useSWR<IAutomobile[]>(`/api/v1/automobiles/${id}`);

  return (
    <>
      <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        {/* <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'red' }}> */}
        <div className="pr-5 cursor-pointer" onClick={() => Router.back()}>
          {'<'}
        </div>
        <Text className="cursor-pointer" align="left" weight="bold" size="xl">
          Automobile
        </Text>
      </div>
      <div className="mx-5">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Manufacturer" IsiList={data ? data[0]?.AutomobileManufactures.name : undefined} />
          <ListDetail List="Brand" IsiList={data ? data[0]?.AutomobileBrands.name : undefined} />
          <ListDetail List="Model" IsiList={data ? data[0]?.model : undefined} />
          <ListDetail List="Body Type" IsiList={data ? data[0]?.AutomobileBodyTypes.name : undefined} />
          <ListDetail
            List="Production Year"
            IsiList={data ? `${data[0].year_start} - ${data[0].year_end}` : undefined}
          />
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Body & Chassis
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Layout" IsiList="FR Front engine, rear wheel drive" />
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Power
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Type" IsiList="FR Front engine, rear wheel driveInternal Combustion Engine" />
          <ListDetail List="Engine / Motor" IsiList="V8" />
        </Grid>
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Dimension
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Curb Weight" IsiList={data ? (data[0]?.curb_wight as unknown as string) : undefined} />
          <ListDetail List="Wheel Base" IsiList={data ? (data[0]?.wheel_base as unknown as string) : undefined} />
          <ListDetail List="Length" IsiList="100mm (1984-1986)" />
          <ListDetail List="Width" IsiList="100mm (1985-1986)" />
          <ListDetail List="Heigth" IsiList="100mm (1985-1989)" />
          <ListDetail List="Heigth" IsiList="100mm (1987-1991)" />
        </Grid>
      </div>
    </>
  );
}
function AddAutomobile(/*props*/) {
  return (
    <>
      <HeadingTop items={[{ title: 'Automobile', href: '/automobile' }, { title: 'Detail Automobile' }]} />
      <ErrorBoundary fallback={<div>Something Wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <DetailAutoMobile />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default AddAutomobile;
