import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Fragment } from 'react';

function MasterPartDetailPages() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Part } = useSWR<any>(`/api/v1/master-part/${id}`);

  return (
    <>
      <HeadingTop
        text="Details Master Part"
        items={[
          { title: 'Part', href: '' },
          { title: 'Master Part', href: '/part/master-part' },
          { title: 'Details Master Part', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl">
          <ListDetail List="Name" IsiList={Part ? Part?.Name : ''} />
          <ListDetail List="Category" IsiList={Part ? Part?.Category : ''} />
        </Grid>
      </div>
    </>
  );
}

export default MasterPartDetailPages;
