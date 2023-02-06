import { ScrollArea, Drawer, Text, Table, Grid, Button } from '@mantine/core';
import { useEffect, useState, useTransition } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import { DatePicker } from '@mantine/dates';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import dayjs from 'dayjs';
import { rp } from '@support/formatter';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';

function AddPayrollPage() {
  const [drawerOpened, toggleDrawer] = useState(false);
  const [, startTransition] = useTransition();

  const [input, handleInput] = useInput({
    payroll_date: '',
    start_date: '',
    end_date: '',
    status: 'New',
  });
  const { data: dataPayroll, error: errorPayroll } = useSWR(
    input.start_date && input.end_date
      ? `/api/v1/payrolls/get-data?start_date=${dayjs(input.start_date).format('YYYY-MM-DD')}&end_date=${dayjs(
          input.end_date
        ).format('YYYY-MM-DD')}`
      : null,
    {
      suspense: false,
    }
  );

  // console.log('tes', dataPayroll, input.start_date);
  useEffect(() => {
    console.log({ errorPayroll });
    if (errorPayroll && errorPayroll?.data) {
      showNotification({
        title: 'Error',
        message: errorPayroll.data.error,
        color: 'red',
      });
    }
    // if (input?.start_date && input?.end_date) {
    //   if (dataPayroll?.length < 0) {
    //     showNotification({
    //       title: 'Error',
    //       message: errorPayroll.data.error,
    //       color: 'red',
    //     });
    //   }
    // }
  }, [errorPayroll]);
  const body = () =>
    dataPayroll.Payrolls.map((item: any, index: any) => (
      <tr key={index}>
        <td className=" w-2/12">{item.Worker}</td>
        <td className=" w-2/12">{item.TotalHm}</td>
        <td className="   w-2/12">{rp(item.HourlyPay)}</td>
        <td className="  text-right  w-2/12">{rp(item.TotalPay)}</td>
      </tr>
    ));

  const clientPay = () =>
    dataPayroll?.Clients.map((item: any, index: any) => (
      <tr key={index}>
        <td />
        <td />
        <td className="   w-2/12">{item.Name}</td>
        <td className="  text-right  w-2/12">{rp(item.TotalPay)}</td>
      </tr>
    ));

  const doSubmit = async (e: any) => {
    e.preventDefault();
    await fetcher(
      `/api/v1/payrolls/generate?start_date=${dayjs(input.start_date).format('YYYY-MM-DD')}&end_date=${dayjs(
        input.end_date
      ).format('YYYY-MM-DD')}&payroll_date=${dayjs(input.payroll_date).format('YYYY-MM-DD')}`,
      {
        method: 'POST',
      }
    )
      .then((res) => {
        console.log(res);

        showNotification({
          title: 'Success',
          message: 'Status payroll berhasil diubah',
          color: 'teal',
        });
        Router.replace('/payroll');
      })
      .catch((err) => {
        console.log(err, 'cek');
        showNotification({
          title: 'Error',
          message: err.data.error,
          color: 'red',
        });
      });
  };

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <HeadingTop
        text="Add New Payroll"
        items={[
          { title: 'Payroll', href: '/payroll' },
          { title: 'Add New Payroll', href: '' },
        ]}
      />
      <ScrollArea>
        <form onSubmit={doSubmit}>
          <div className="p-6">
            <Grid gutter="xl">
              <Grid.Col md={6}>
                <div className="flex flex-col md:flex-row items-center">
                  <DatePicker id="enter" className="flex-col md:flex-row w-full" label="Periode" required />
                  <DatePicker
                    className="flex-col md:flex-row w-full"
                    placeholder="Select Date"
                    value={input.start_date}
                    onChange={(v) => {
                      startTransition(() => {
                        handleInput('start_date', true)(v);
                      });
                    }}
                    required
                  />
                  <span className="hidden md:flex p-3">-</span>
                  <div className="h-6 md:hidden" />
                  <DatePicker
                    className="flex-col md:flex-row w-full"
                    value={input.end_date}
                    onChange={(v) => {
                      startTransition(() => {
                        handleInput('end_date', true)(v);
                      });
                    }}
                    placeholder="Select Date"
                  />
                </div>
              </Grid.Col>
              <Grid.Col md={6}>
                <DatePicker
                  value={input.payroll_date}
                  onChange={(v) => {
                    startTransition(() => {
                      handleInput('payroll_date', true)(v);
                    });
                  }}
                  placeholder="Select Date"
                  label="Payroll Date"
                  required
                />
              </Grid.Col>
            </Grid>
          </div>
          {dataPayroll && dataPayroll.Payrolls.length > 0 ? (
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Total MH</th>
                  <th>Hourly Pay</th>
                  <th style={{ textAlign: 'end' }}>Total Pay</th>
                </tr>
              </thead>
              <tbody>
                {body()}
                <tr>
                  <td className="p-6 font-bold">Total</td>
                  <td className="p-6">
                    {dataPayroll.Payrolls.reduce((prev: any, curr: any) => prev + curr.TotalHm, 0)}
                  </td>
                  <td />
                  <td className="font-bold  text-right">{rp(dataPayroll?.Total)}</td>
                </tr>
                <tr>
                  <td className="p-6"> </td>
                  <td className="p-6"> </td>
                  <td className=" font-bold">Payment By </td>
                  <td className="font-bold" />
                </tr>
                {clientPay()}
                <tr>
                  <td className="p-6"> </td>
                  <td className="p-6"> </td>
                  <td className=" font-bold">Total </td>
                  <td className="font-bold text-right ">{rp(dataPayroll?.Total)}</td>
                </tr>
                <tr>
                  <td className="p-6"> </td>
                  <td className="p-6"> </td>
                  <td className="p-6"> </td>
                  <td className="font-bold">
                    <Button className="bg-black hover:bg-black w-full h-14" type="submit">
                      Generate
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Text className="my-5" align="center" weight="bold">
              Tidak ada data.
            </Text>
          )}
        </form>
      </ScrollArea>
    </>
  );
}

export default AddPayrollPage;
