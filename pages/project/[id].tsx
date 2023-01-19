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
          <ListDetail List="Project Name" IsiList={Project ? Project[0]?.Name : ''} />
          <ListDetail List="Client" IsiList={Project ? Project[0]?.Client?.Name : ''} />
          <ListDetail List="PIC" IsiList={Project ? Project[0]?.PIC?.Name : ''} />
          <ListDetail
            List="Automobile"
            IsiList={Project ? `${Project[0]?.Automobile?.Model} - ${Project[0]?.Automobile?.YearStart}` : ''}
          />
          <ListDetail List="Power Type" IsiList={Project ? Project[0]?.PowerType : ''} />
          <ListDetail
            List="Engine"
            IsiList={
              Project
                ? `${Project[0].Automobile?.AutomobileManufactures?.Name}${Project[0].Engine?.Name} ( ${Project[0].Engine?.YearStart}-${Project[0].Engine?.YearEnd})`
                : ''
            }
          />
          <ListDetail List="Notes" IsiList={Project ? Project[0]?.Notes : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetailProjectPage;
