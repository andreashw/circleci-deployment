import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IGetUser } from '@contracts/user-interface';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetailUserPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: user } = useSWR<IGetUser>(`/api/v1/users/${id}`);

  return (
    <>
      <HeadingTop
        text="User"
        items={[
          { title: 'User', href: '/user' },
          { title: 'Details', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Name" IsiList={user ? user?.Name : ''} />
          <ListDetail List="Email" IsiList={user ? user?.Email : ''} />
          <ListDetail List="Active" IsiList={user ? user?.IsActive.toString() : ''} />
          <ListDetail List="Role" IsiList={user ? user?.Roles[0].Name : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetailUserPage;
