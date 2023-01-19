import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { IPayroll } from '@contracts/payroll-interface';
// import { IClient } from '@contracts/client-interface';
import { Grid, ScrollArea, Table, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { rp } from '@support/formatter';
import { fetcher } from '@api/fetcher';

function DetilPatrollPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Payroll } = useSWR<IPayroll>(`/api/v1/payrolls/${id}`);
  console.log(Payroll?.PayrollDate, 'tes');

  const body = () =>
    Payroll?.Payrolls.map((item: any, index: any) => (
      <tr key={index}>
        <td className=" w-2/12">{item.Worker}</td>
        <td className=" w-2/12">{item.TotalHm}</td>
        <td className="   w-2/12">{rp(item.HourlyPay)}</td>
        <td className="  w-2/12">{rp(item.TotalPay)}</td>
      </tr>
    ));
  const clientPay = () =>
    Payroll?.Clients.map((item: any, index: any) => (
      <tr key={index}>
        <td />
        <td />
        <td className="   w-2/12">{item.Name}</td>
        <td className="  w-2/12">{rp(item.TotalPay)}</td>
      </tr>
    ));

  const exportXls = async () => {
    const response: any = await fetcher(
      `/api/v1/payrolls/${id}/export`,
      {
        method: 'GET',
      },
      true
    );
    // console.log('Response from API ', response);

    const blob = new Blob([response], {
      type: 'text/plain',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = 'report-payroll.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <HeadingTop
        exportPayroll={() => exportXls()}
        listPayroll
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
            IsiList={`${dayjs(Payroll?.StartDate).format('ddd, DD MMM YYYY')} - ${dayjs(Payroll?.EndDate).format(
              'ddd, DD MMM YYYY'
            )}`}
          />
          <ListDetail
            List="Payroll Date"
            classname=" font-bold text-black"
            IsiList={dayjs(Payroll?.PayrollDate).format('ddd, DD MMM YYYY')}
          />
          <ListDetail List="Status" classname=" font-bold text-black" IsiList={Payroll?.Status} />
        </Grid>
      </div>

      {Payroll && Payroll?.Payrolls.length > 0 ? (
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
                <td className="p-6">{Payroll.Payrolls.reduce((prev, curr) => prev + curr.TotalHm, 0)}</td>
                <td />
                <td className="font-bold">{rp(Payroll?.Total)}</td>
              </tr>
              <tr>
                <td className="p-6"> </td>
                <td className="p-6"> </td>
                <td className=" font-bold">Payment By </td>
                <td className="font-bold">{rp(Payroll?.Total)}</td>
              </tr>
              {clientPay()}
              <tr>
                <td className="p-6"> </td>
                <td className="p-6"> </td>
                <td className=" font-bold">Total </td>
                <td className="font-bold">{rp(Payroll?.Total)}</td>
              </tr>
            </tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text className="my-5" align="center" weight="bold">
          Tidak ada data.
        </Text>
      )}
    </>
  );
}

export default DetilPatrollPage;
