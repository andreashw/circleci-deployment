import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IAutomobile, IParts } from '@contracts/parts-interface';
import { IVendor } from '@contracts/vendor-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Fragment } from 'react';

function PartDetailPages() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Part } = useSWR<IParts>(`/api/v1/parts/${id}`);

  return (
    <>
      <HeadingTop
        text="Part"
        items={[
          { title: 'Part', href: '/part' },
          { title: 'Details Part', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl">
          <ListDetail List="Name" IsiList={Part ? Part?.name_input : ''} />
          <ListDetail List="Category" IsiList={Part ? Part?.category : ''} />
          <ListDetail List="Part Brand" IsiList={Part ? Part?.brand_input : ''} />
          <ListDetail List="Req. Pcs" IsiList={Part ? `${Part?.req_pcs_input.toString()} ${Part?.req_unit}` : ''} />
          <ListDetail List="Part Material" IsiList={Part ? Part?.material_input : ''} />
        </Grid>
        <Text className="mt-4 mb-[1rem] text-[20px]" weight={700}>
          Vendor
        </Text>
        <Grid gutter="xl">
          {Part &&
            // eslint-disable-next-line @typescript-eslint/no-shadow
            Part.vendors?.map((data: IVendor) => (
              <Fragment key={data.name}>
                <ListDetail List="Vendor" IsiList={data.name} />
              </Fragment>
            ))}
        </Grid>
        <Text className="mt-4 mb-[1rem] text-[20px]" weight={700}>
          Automobile
        </Text>
        <Grid key={id} gutter="xl">
          {Part &&
            // eslint-disable-next-line @typescript-eslint/no-shadow
            Part.automobiles?.map((data: IAutomobile, id: number) => (
              <Fragment key={id}>
                <ListDetail List="Automobile" IsiList={data.name} />
              </Fragment>
            ))}
        </Grid>
      </div>
    </>
  );
}

export default PartDetailPages;
