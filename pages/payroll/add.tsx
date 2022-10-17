import { ScrollArea, Drawer, Text, Table, Grid, Button } from '@mantine/core';
import { useState, useTransition } from 'react';
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
  const { data: dataPayroll } = useSWR(
    input.start_date && input.end_date
      ? `/api/v1/payrolls/get-data?start_date=${dayjs(input.start_date).format('YYYY-MM-DD')}&end_date=${dayjs(
          input.end_date
        ).format('YYYY-MM-DD')}`
      : null
  );

  console.log('tes', dataPayroll, input.start_date);
  const body = () =>
    dataPayroll.payrolls.map((item: any, index: any) => (
      <tr key={index}>
        <td className=" w-2/12">{item.worker}</td>
        <td className=" w-2/12">{item.total_hm}</td>
        <td className="   w-2/12">{rp(item.hourly_pay)}</td>
        <td className="  text-right  w-2/12">{rp(item.total_pay)}</td>
      </tr>
    ));

  const clientPay = () =>
    dataPayroll?.clients.map((item: any, index: any) => (
      <tr key={index}>
        <td />
        <td />
        <td className="   w-2/12">{item.name}</td>
        <td className="  text-right  w-2/12">{rp(item.total_pay)}</td>
      </tr>
    ));

  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher(
      `/api/v1/payrolls/generate?start_date=${dayjs(input.start_date).format('YYYY-MM-DD')}&end_date=${dayjs(
        input.end_date
      ).format('YYYY-MM-DD')}&payroll_date=${dayjs(input.payroll_date).format('YYYY-MM-DD')}`,
      {
        method: 'POST',
      }
    );

    if (response) {
      showNotification({
        title: 'Success',
        message: 'Status payroll berhasil diubah',
        color: 'teal',
      });
      Router.replace('/payroll');
    }
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
                <div className="flex">
                  <DatePicker
                    placeholder="Select Date"
                    value={input.start_date}
                    onChange={(v) => {
                      startTransition(() => {
                        handleInput('start_date', true)(v);
                      });
                    }}
                    label="Periode"
                  />
                  <p className="p-3">-</p>
                  <DatePicker
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
                />
              </Grid.Col>
            </Grid>
          </div>
          {dataPayroll && dataPayroll.payrolls.length > 0 ? (
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
                    {dataPayroll.payrolls.reduce((prev: any, curr: any) => prev + curr.total_hm, 0)}
                  </td>
                  <td />
                  <td className="font-bold  text-right">{rp(dataPayroll?.total)}</td>
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
                  <td className="font-bold text-right ">{rp(dataPayroll?.total)}</td>
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
            <Text align="center" weight="bold">
              Test.
            </Text>
          )}
        </form>
      </ScrollArea>
    </>
  );
}

export default AddPayrollPage;
