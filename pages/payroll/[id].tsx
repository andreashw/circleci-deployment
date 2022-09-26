import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
// import { IClient } from '@contracts/client-interface';
import { Grid, ScrollArea, Table, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

function DetilPatrollPage() {
  const router = useRouter();
  // const id = router.query.id as unknown as number;
  // const { data: Client } = useSWR<IClient[]>(`/api/v1/clients/${id}`);
  const { data: dataClients } = useSWR('/api/v1/clients/');
  const body = () =>
    dataClients.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {item.name}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {item.email}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {item.City.name}
        </td>
        <td className="cursor-pointer text-end  w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {item.phone}
        </td>
      </tr>
    ));
  return (
    <>
      <HeadingTop
        text="Payroll"
        items={[
          { title: 'Payroll', href: '/payroll' },
          { title: 'Details Payroll', href: '' },
        ]}
      />

      <Grid gutter="xl" className="mt-10">
        <ListDetail List="Periode Payroll" IsiList="Fri,29 Jul 22 - Thu,4 Aug 22" />
        <ListDetail List="Payroll Date" IsiList="Sat, 6 Aug 22" />
        <ListDetail List="Status" IsiList="Pending" />
      </Grid>
      {dataClients.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Worker</th>
                <th>Total MH</th>
                <th>Hourly Pay</th>
                <th style={{ textAlign: 'end' }} className=" text-end ">
                  Total Pay
                </th>
              </tr>
            </thead>
            <tbody>{body()}</tbody>
            <tfoot>
              <tr>
                <td className="p-6 font-bold">Total</td>
                <td className="p-6">Total MH</td>
                <th> </th>
                <th style={{ textAlign: 'end' }} className=" text-end ">
                  Rp 30.000.000
                </th>
              </tr>
            </tfoot>
          </Table>
          <Table>
            <tr>
              <td className="p-6 font-bold"> </td>
              <td className="p-6"> </td>
              <th>Payment By </th>
              <th style={{ textAlign: 'end' }} className=" text-end ">
                {' '}
              </th>
            </tr>
            <tr>
              <td className="p-6 font-bold"> </td>
              <td className="p-6"> </td>
              <th>DS</th>
              <th style={{ textAlign: 'end' }} className=" text-end ">
                Rp 10.000.000
              </th>
            </tr>
            <tr>
              <td className="p-6 font-bold"> </td>
              <td className="p-6"> </td>
              <th>Kuno ID</th>
              <th style={{ textAlign: 'end' }} className=" text-end ">
                Rp 10.000.000
              </th>
            </tr>
            <tr>
              <td className="p-6 font-bold"> </td>
              <td className="p-6"> </td>
              <th>Total</th>
              <th style={{ textAlign: 'end' }} className=" text-end ">
                Rp 30.000.000
              </th>
            </tr>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Test.
        </Text>
      )}
    </>
  );
}

export default DetilPatrollPage;
