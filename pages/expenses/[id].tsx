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
  const { data: Expense } = useSWR<any>(`/api/v1/expense/${id}`);

  return (
    <>
      <HeadingTop
        text="Expense"
        items={[
          { title: 'expense', href: '/expense' },
          { title: 'Details Expense', href: '' },
        ]}
      />
      <div className="px-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Date" IsiList={Expense ? dayjs(Expense?.Date).format('ddd, DD MMMM YYYY') : ''} />
          <ListDetail List="Type" IsiList={Expense ? Expense?.Type : ''} />
          <ListDetail List="Amount" IsiList={Expense ? rp(Expense?.Amount) : ''} />
          <ListDetail List="Description" IsiList={Expense ? Expense?.Description : ''} />
          <ListDetail List="Project" IsiList={Expense ? Expense?.Project?.Name : ''} />
        </Grid>
      </div>
    </>
  );
}

export default DetilexpensePage;
