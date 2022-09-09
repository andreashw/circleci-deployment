import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IClient } from '@contracts/client-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetilClientPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Client } = useSWR<IClient[]>(`/api/v1/clients/${id}`);

  return (
    <>
      <HeadingTop
        text="Client"
        items={[
          { title: 'Client', href: '/client' },
          { title: 'Details Client', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Name" IsiList={Client ? Client[0]?.name : ''} />
          <ListDetail List="Email" IsiList={Client ? Client[0]?.email : ''} />
          <ListDetail List="Address" IsiList={Client ? Client[0]?.phone : ''} />
          <ListDetail List="Phone Number" IsiList={Client ? Client[0]?.address : ''} />
          <ListDetail List="City" IsiList={Client ? Client[0]?.City?.name.toString() : ''} />
          <ListDetail List="Province" IsiList={Client ? Client[0]?.Province?.name.toString() : ''} />
          <ListDetail List="Notes" IsiList={Client ? Client[0]?.notes : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetilClientPage;
