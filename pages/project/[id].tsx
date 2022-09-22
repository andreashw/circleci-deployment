import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IProvince } from '@contracts/client-interface';
import { IProject } from '@contracts/project-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetailProjectPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Project } = useSWR<IProject[]>(`/api/v1/projects/${id}`);
  const { data: dataPic } = useSWR<IProvince[]>('/api/v1/projects/pic/');
  const { data: dataAutomobile } = useSWR<IProvince[]>('/api/v1/projects/automobiles/');
  const { data: dataClient } = useSWR<IProvince[]>('/api/v1/projects/clients/');
  const { data: dataPower } = useSWR<IProvince[]>('/api/v1/projects/powers/');

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
          <ListDetail
            List="Client"
            IsiList={Project ? dataClient?.filter((a) => a.ID === Project[0]?.client_id)[0].Name : ''}
          />
          <ListDetail List="PIC" IsiList={Project ? dataPic?.filter((a) => a.ID === Project[0]?.pic_id)[0].Name : ''} />
          <ListDetail
            List="Automobile"
            IsiList={Project ? dataAutomobile?.filter((a) => a.ID === Project[0]?.automobile_id)[0].Name : ''}
          />
          <ListDetail List="Power Type" IsiList={Project ? Project[0]?.power_type : ''} />
          <ListDetail
            List="Engine"
            IsiList={Project ? dataPower?.filter((a) => a.ID === Project[0]?.engine_id)[0].Name : ''}
          />
          <ListDetail List="Notes" IsiList={Project ? Project[0]?.notes : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetailProjectPage;
