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
          { title: 'Part', href: '' },
          { title: 'Details Part', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl">
          <ListDetail List="Name" IsiList={Part ? Part?.NameInput : ''} />
          <ListDetail List="Category" IsiList={Part ? Part?.Category : ''} />
          <ListDetail List="Part Brand" IsiList={Part ? Part?.BrandInput : ''} />
          <ListDetail List="Req. Pcs" IsiList={Part ? `${Part?.ReqPcsInput.toString()} ${Part?.ReqUnit}` : ''} />
          <ListDetail List="Part Material" IsiList={Part ? Part?.MaterialInput : ''} />
        </Grid>
        <Text className="mt-4 mb-[1rem] text-[20px]" weight={700}>
          Vendor
        </Text>
        <Grid gutter="xl">
          {Part &&
            // eslint-disable-next-line @typescript-eslint/no-shadow
            Part.Vendors?.map((data: IVendor) => (
              <Fragment key={data.Name}>
                <ListDetail List="Vendor" IsiList={data.Name} />
              </Fragment>
            ))}
        </Grid>
        <Text className="mt-4 mb-[1rem] text-[20px]" weight={700}>
          Automobile
        </Text>
        <Grid key={id} gutter="xl">
          {Part &&
            // eslint-disable-next-line @typescript-eslint/no-shadow
            Part.Automobiles?.map((data: IAutomobile, id: number) => (
              <Fragment key={id}>
                <ListDetail List="Automobile" IsiList={data.Name} />
              </Fragment>
            ))}
        </Grid>
      </div>
    </>
  );
}

export default PartDetailPages;
