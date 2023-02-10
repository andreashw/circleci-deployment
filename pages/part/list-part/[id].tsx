import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { Grid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Fragment } from 'react';

function ListPartDetailPages() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Part } = useSWR<any>(`/api/v1/item-part/${id}`);

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
          <ListDetail List="Part Name" IsiList={Part ? Part?.MasterPart?.Name : ''} />
          <ListDetail List="Category" IsiList={Part ? Part?.MasterPart?.Category : ''} />
          <ListDetail List="Brand" IsiList={Part ? Part?.Brand : ''} />
          <ListDetail List="Part Material" IsiList={Part ? Part?.Material : ''} />
          <ListDetail
            List="Manufactured For"
            IsiList={
              Part
                ? `${Part?.ManufacturedFor?.AutomobileBrands.Name} ${Part?.ManufacturedFor?.Model} ${Part?.ManufacturedFor?.YearStart} - ${Part?.ManufacturedFor?.YearEnd}`
                : ''
            }
          />
          <ListDetail List="Part Number" IsiList={Part ? Part?.Number : ''} />
        </Grid>
      </div>
    </>
  );
}

export default ListPartDetailPages;
