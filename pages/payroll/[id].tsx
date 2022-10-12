import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IPayroll } from '@contracts/payroll-interface';
// import { IClient } from '@contracts/client-interface';
import { Grid, ScrollArea, Table, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { rp } from '@support/formatter';

function DetilPatrollPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Payroll } = useSWR<IPayroll>(`/api/v1/payrolls/${id}`);
  console.log(Payroll?.payroll_date, 'tes');

  const body = () =>
    Payroll?.payrolls.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {item.worker}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {item.total_hm}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {rp(item.hourly_pay)}
        </td>
        <td className="cursor-pointer  w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {rp(item.total_pay)}
        </td>
      </tr>
    ));
  const clientPay = () =>
    Payroll?.clients.map((item: any, index: any) => (
      <tr key={index}>
        <td />
        <td />
        <td className="cursor-pointer   w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {item.name}
        </td>
        <td className="cursor-pointer  w-2/12" onClick={() => router.push(`/client/${item.ID}`)}>
          {rp(item.total_pay)}
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
      <div className="w-full p-6">
        <Grid gutter="xl" className="mt-10">
          <ListDetail
            List="Periode Payroll"
            classname=" font-bold text-black"
            IsiList={`${dayjs(Payroll?.start_date).format('ddd, DD MMM YYYY')} - ${dayjs(Payroll?.end_date).format(
              'ddd, DD MMM YYYY'
            )}`}
          />
          <ListDetail
            List="Payroll Date"
            classname=" font-bold text-black"
            IsiList={dayjs(Payroll?.payroll_date).format('ddd, DD MMM YYYY')}
          />
          <ListDetail List="Status" classname=" font-bold text-black" IsiList={Payroll?.status} />
        </Grid>
      </div>

      {Payroll && Payroll?.payrolls.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Worker</th>
                <th>Total MH</th>
                <th>Hourly Pay</th>
                <th>Total Pay</th>
              </tr>
            </thead>
            <tbody>
              {body()}
              <tr>
                <td className="p-6 font-bold">Total</td>
                <td className="p-6">{Payroll.payrolls.reduce((prev, curr) => prev + curr.total_hm, 0)}</td>
                <td />
                <td className="font-bold">{rp(Payroll?.total)}</td>
              </tr>
              <tr>
                <td className="p-6"> </td>
                <td className="p-6"> </td>
                <td className=" font-bold">Payment By </td>
                <td className="font-bold">{rp(Payroll?.total)}</td>
              </tr>
              {clientPay()}
              <tr>
                <td className="p-6"> </td>
                <td className="p-6"> </td>
                <td className=" font-bold">Total </td>
                <td className="font-bold">{rp(Payroll?.total)}</td>
              </tr>
            </tbody>
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
