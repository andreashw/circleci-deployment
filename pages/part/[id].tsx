import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IParts } from '@contracts/parts-interface';
import { IVendor } from '@contracts/vendor-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function PartDetailPages() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Part } = useSWR<IParts[]>(`/api/v1/parts/${id}`);
  const { data: Vendor } = useSWR<IVendor[]>('/api/v1/vendors/');

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
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Name" IsiList={Part ? Part[0]?.name_input : ''} />
          <ListDetail List="Category" IsiList={Part ? Part[0]?.category : ''} />
          <ListDetail List="Part Brand" IsiList={Part ? Part[0]?.brand_input : ''} />
          <ListDetail
            List="Req. Pcs"
            IsiList={Part ? `${Part[0]?.req_pcs_input.toString()} ${Part[0]?.req_unit}` : ''}
          />
          <ListDetail List="Part Material" IsiList={Part ? Part[0]?.material_input : ''} />
        </Grid>
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Vendor
        </Text>
        {Part &&
          // eslint-disable-next-line @typescript-eslint/no-shadow
          Part[0].vendor_id?.map((data: any, id: number) => (
            <Grid key={id} gutter="xl" className="mb-10">
              <ListDetail
                List="Vendor"
                IsiList={Vendor?.filter((vendor: any) => vendor.ID === data.vendor_id)[0].name}
              />
            </Grid>
          ))}
      </div>
    </>
  );
}

export default PartDetailPages;
