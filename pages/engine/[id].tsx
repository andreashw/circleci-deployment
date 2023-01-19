import ErrorBoundary from '@components/ErrorBoundary';
import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IEngine } from '@contracts/engine-interface';
import { Divider, Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { Fragment, Suspense } from 'react';
import useSWR from 'swr';

function Detail() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data } = useSWR<IEngine[]>(`/api/v1/engines/${id}`);

  return (
    <>
      <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        {/* <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'red' }}> */}
        <div className="pr-5 cursor-pointer" onClick={() => router.back()}>
          {'<'}
        </div>
        <Text className="cursor-pointer" align="left" weight="bold" size="xl">
          Engine
        </Text>
      </div>
      <div className="mx-5">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl">
          <ListDetail List="Engine Name" IsiList={data ? data[0]?.Name : undefined} />
          <ListDetail List="Engine Name" IsiList={data ? data[0]?.EngineManufactures.Name : undefined} />
          <ListDetail List="Production Year" IsiList={data ? `${data[0].YearStart} - ${data[0].YearEnd}` : undefined} />
        </Grid>
        <Divider my="sm" className="my-5" />

        {/* DISPLACEMENTS SECTION */}
        {data
          ? data[0]?.Displacements &&
            data[0]?.Displacements.map((displacement: any, di: number) => (
              <Fragment key={di}>
                <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
                  {`Displacement ${di + 1}`}
                </Text>
                <Grid gutter="xl">
                  <ListDetail List="Displacement" IsiList={`${displacement.displacement}`} />
                  <ListDetail List="Power" IsiList={`${displacement.power}`} />
                  <ListDetail List="Torque Output" IsiList={`${displacement.torque_output}`} />
                </Grid>
                <Divider my="sm" className="my-5" />
              </Fragment>
            ))
          : undefined}

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          General
        </Text>
        <Grid gutter="xl">
          <ListDetail List="Layout" IsiList={data ? data[0]?.EngineLayouts.Name : undefined} />
          <ListDetail List="Engine Type" IsiList={data ? data[0]?.EngineType : undefined} />
          <ListDetail List="Fuel Type" IsiList={data ? data[0]?.FuelType : undefined} />
        </Grid>
        <Divider my="sm" className="my-5" />

        {/* CYLINDER BORE SECTION */}
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Cylinder Bore
        </Text>
        <Grid gutter="xl">
          {data
            ? data[0]?.CylinderBores &&
              data[0]?.CylinderBores.map((cylinderBore: any, ci: number) => (
                <ListDetail key={ci} List="Cylinder Bore" IsiList={`${cylinderBore.cylinder_bore}`} />
              ))
            : undefined}
        </Grid>
        <Divider my="sm" className="my-5" />

        {/* TRANSMISSIONS SECTION */}
        {data
          ? data[0]?.Transmissions &&
            data[0]?.Transmissions.map((transmission: any, ti: number) => (
              <Fragment key={ti}>
                <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
                  {`Transmission ${ti + 1}`}
                </Text>
                <Grid gutter="xl">
                  <ListDetail List="Transmission" IsiList={`${transmission.transmission}`} />
                  <ListDetail List="No. of Gear" IsiList={`${transmission.no_gear}`} />
                </Grid>
                <Divider my="sm" className="my-5" />
              </Fragment>
            ))
          : undefined}
      </div>
    </>
  );
}
function DetailEngine(/*props*/) {
  return (
    <>
      <HeadingTop items={[{ title: 'Engine', href: '/engine' }, { title: 'Detail Engine' }]} />
      <ErrorBoundary fallback={<div>Something Wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Detail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default DetailEngine;
