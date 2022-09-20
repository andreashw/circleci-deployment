import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IClient } from '@contracts/client-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetailProjectPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Project } = useSWR<IClient[]>(`/api/v1/clients/${id}`);

  return (
    <>
      <HeadingTop
        text="Project"
        items={[
          { title: 'Project', href: '/Project' },
          { title: 'Details Project', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Project Name" IsiList={Project ? Project[0]?.name : ''} />
          <ListDetail List="Client" IsiList={Project ? Project[0]?.email : ''} />
          <ListDetail List="PIC" IsiList={Project ? Project[0]?.phone : ''} />
          <ListDetail List="Automobile" IsiList={Project ? Project[0]?.address : ''} />
          <ListDetail List="Power Type" IsiList={Project ? Project[0]?.City?.name.toString() : ''} />
          <ListDetail List="Engine" IsiList={Project ? Project[0]?.Province?.name.toString() : ''} />
          <ListDetail List="Notes" IsiList={Project ? Project[0]?.notes : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetailProjectPage;
