import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetailProjectDiagnosePage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Project } = useSWR<any>(`/api/v1/project-part/${id}`);

  return (
    <>
      <HeadingTop
        text="Part Diagnose"
        items={[
          { title: 'Project', href: '' },
          { title: 'Part Diagnose', href: '/project/part-diagnose' },
          { title: 'Details Project', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Project Name" IsiList={Project ? Project?.Project.Name : ''} />
          <ListDetail List="Category" IsiList={Project ? Project?.Part.MasterPart.Category : ''} />
          <ListDetail List="Part Name" IsiList={Project ? Project.Part.MasterPart.Name : ''} />
          <ListDetail List="Quantity" IsiList={Project ? Project.Quantity : ''} />
          <ListDetail List="Condition" IsiList={Project ? Project.Condition : ''} />
          <ListDetail List="Action" IsiList={Project ? Project.Action : ''} />
          <ListDetail List="StorageLocation" IsiList={Project ? Project.StorageLocation : ''} />
          <ListDetail List="Note" IsiList={Project ? Project.Note : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetailProjectDiagnosePage;
