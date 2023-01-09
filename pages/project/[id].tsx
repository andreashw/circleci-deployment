import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IProject } from '@contracts/project-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetailProjectPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Project } = useSWR<IProject[]>(`/api/v1/projects/${id}`);

  return (
    <>
      <HeadingTop
        text="Project"
        items={[
          { title: 'Project', href: '/project' },
          { title: 'Details Project', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Project Name" IsiList={Project ? Project[0]?.name : ''} />
          <ListDetail List="Client" IsiList={Project ? Project[0]?.Client?.name : ''} />
          <ListDetail List="PIC" IsiList={Project ? Project[0]?.Pic?.name : ''} />
          <ListDetail
            List="Automobile"
            IsiList={Project ? `${Project[0]?.Automobile?.model} - ${Project[0]?.Automobile?.year_start}` : ''}
          />
          <ListDetail List="Power Type" IsiList={Project ? Project[0]?.power_type : ''} />
          <ListDetail
            List="Engine"
            IsiList={
              Project
                ? `${Project[0].Engine?.name} ( ${Project[0].Engine?.year_start}-${Project[0].Engine?.year_end})`
                : ''
            }
          />
          <ListDetail List="Notes" IsiList={Project ? Project[0]?.notes : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetailProjectPage;
