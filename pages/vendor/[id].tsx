import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IVendor } from '@contracts/vendor-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetilClientPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Vendor } = useSWR<IVendor[]>(`/api/v1/vendors/${id}`);

  return (
    <>
      <HeadingTop
        text="Vendor"
        items={[
          { title: 'Vendor', href: '/client' },
          { title: 'Details Vendor', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Name" IsiList={Vendor ? Vendor[0]?.name : ''} />
          <ListDetail List="Type" IsiList={Vendor ? Vendor[0]?.type : ''} />
          <ListDetail List="Website" IsiList={Vendor ? Vendor[0]?.url_website : ''} />
          <ListDetail List="Country" IsiList={Vendor ? Vendor[0]?.Country?.name : ''} />
          <ListDetail List="Address" IsiList={Vendor ? Vendor[0]?.phone : ''} />
          <ListDetail List="Email" IsiList={Vendor ? Vendor[0]?.email : ''} />
          <ListDetail List="Phone Number" IsiList={Vendor ? Vendor[0]?.address : ''} />
          <ListDetail List="Description" IsiList={Vendor ? Vendor[0]?.description : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetilClientPage;
