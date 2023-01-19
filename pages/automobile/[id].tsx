import ErrorBoundary from '@components/ErrorBoundary';
import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IAutomobile } from '@contracts/automobile-interface';
import { Grid, Text } from '@mantine/core';
import Router, { useRouter } from 'next/router';
import { Fragment, Suspense } from 'react';
import useSWR from 'swr';

function Detail() {
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
          <ListDetail List="Manufacturer" IsiList={data ? data[0]?.AutomobileManufactures.Name : undefined} />
          <ListDetail List="Brand" IsiList={data ? data[0]?.AutomobileBrands.Name : undefined} />
          <ListDetail List="Model" IsiList={data ? data[0]?.Model : undefined} />
          <ListDetail List="Body Type" IsiList={data ? data[0]?.AutomobileBodyTypes.Name : undefined} />
          <ListDetail List="Production Year" IsiList={data ? `${data[0].YearStart} - ${data[0].YearEnd}` : undefined} />
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Body & Chassis
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Layout" IsiList={data ? data[0]?.AutomobileBodyTypes.Name : undefined} />
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Power
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Type" IsiList={data ? data[0]?.PowerType : undefined} />
          <ListDetail List="Engine / Motor" IsiList="V8" />
        </Grid>
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Dimension
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Curb Weight" IsiList={data ? `${data[0]?.CurbWight as unknown as string}mm` : undefined} />
          <ListDetail List="Wheel Base" IsiList={data ? `${data[0]?.WheelBase as unknown as string}mm` : undefined} />
          {/* LENGTH SECTION */}
          {data
            ? data[0]?.Lengths &&
              data[0]?.Lengths.map((length: any, li: number) => (
                <Fragment key={li}>
                  <ListDetail
                    List={`Length ${li + 1}`}
                    IsiList={`${length.length}mm (${length.startYear}-${length.endYear})`}
                  />
                </Fragment>
              ))
            : undefined}
          {/* WIDTH SECTION */}
          {data
            ? data[0]?.Widths &&
              data[0]?.Widths.map((width: any, wi: number) => (
                <Fragment key={wi}>
                  <ListDetail
                    List={`Width ${wi + 1}`}
                    IsiList={`${width.width}mm (${width.startYear}-${width.endYear})`}
                  />
                </Fragment>
              ))
            : undefined}
          {/* HEIGHT SECTION */}
          {data
            ? data[0]?.Heights &&
              data[0]?.Heights.map((height: any, hi: number) => (
                <Fragment key={hi}>
                  <ListDetail
                    List={`Height ${hi + 1}`}
                    IsiList={`${height.height}mm (${height.startYear}-${height.endYear})`}
                  />
                </Fragment>
              ))
            : undefined}
        </Grid>
      </div>
    </>
  );
}
function DetailAutomobile(/*props*/) {
  return (
    <>
      <HeadingTop items={[{ title: 'Automobile', href: '/automobile' }, { title: 'Detail Automobile' }]} />
      <ErrorBoundary fallback={<div>Something Wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Detail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default DetailAutomobile;
