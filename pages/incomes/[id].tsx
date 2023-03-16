import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { Grid, Text } from '@mantine/core';
import { rp } from '@support/formatter';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetilexpensePage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Incomes } = useSWR<any>(`/api/v1/income/${id}`);

  return (
    <>
      <HeadingTop
        text="Incomes"
        items={[
          { title: 'Incomes', href: '/incomes' },
          { title: 'Details Incomes', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Project" IsiList={Incomes ? Incomes?.[0]?.Project?.Name : ''} />
          <ListDetail List="Date" IsiList={Incomes ? dayjs(Incomes?.[0]?.Date).format('ddd, DD MMMM YYYY') : ''} />
          <ListDetail List="Category" IsiList={Incomes ? Incomes?.[0]?.Category.Name : ''} />
          <ListDetail List="Amount" IsiList={Incomes ? rp(Incomes?.[0]?.Amount) : ''} />
          <ListDetail List="Description" IsiList={Incomes ? Incomes?.[0]?.Description : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetilexpensePage;
