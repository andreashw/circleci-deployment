import { ScrollArea, Drawer, Text, Table, Grid, Button, Select } from '@mantine/core';
import { useState, useTransition } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { DatePicker } from '@mantine/dates';
import HeadingTop from '@components/TopComponents/Heading';
import { IPayroll } from '@contracts/payroll-interface';
import { rp } from '@support/formatter';
import { IconChevronDown } from '@tabler/icons';
import useInput from '@hooks/useInput';
import dayjs from 'dayjs';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';

function EditPayrollPage() {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Payroll } = useSWR<IPayroll>(`/api/v1/payrolls/${id}`);
  const [drawerOpened, toggleDrawer] = useState(false);
  const [, startTransition] = useTransition();
  const [input, handleInput] = useInput({
    payroll_date: Payroll ? dayjs(Payroll.PayrollDate).toDate() : '',
    start_date: Payroll ? dayjs(Payroll.StartDate).toDate() : '',
    end_date: Payroll ? dayjs(Payroll.EndDate).toDate() : '',
    status: Payroll ? Payroll.Status : '',
  });

  // const { data: dataClients } = useSWR('/api/v1/clients/');

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

  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher(`/api/v1/payrolls/${id}`, {
      method: 'PATCH',
      body: {
        status: input.status,
      },
    });

    if (response) {
      showNotification({
        title: 'Success',
        message: 'Status payroll berhasil diubah',
        color: 'teal',
      });
      router.replace('/payroll');
    }
  };
  console.log('tes', input.start_date, handleInput('start_date', true));

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <HeadingTop
        text="Add New Entry"
        items={[
          { title: 'Payroll', href: '/payroll' },
          { title: 'Add New Entry', href: '' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <ScrollArea>
          <div className="p-6">
            <Grid gutter="xl">
              <Grid.Col md={6}>
                <div className="flex">
                  <DatePicker
                    placeholder="Select Date"
                    value={input.start_date}
                    disabled
                    onChange={handleInput('start_date', true)}
                    label="Periode"
                  />
                  <p className="p-3">-</p>
                  <DatePicker
                    placeholder="Select Date"
                    value={input.end_date}
                    disabled
                    onChange={handleInput('end_date', true)}
                  />
                </div>
              </Grid.Col>
              <Grid.Col md={6}>
                <DatePicker
                  placeholder="Select Date"
                  value={input.Payroll_date}
                  disabled
                  onChange={handleInput('payroll_date', true)}
                  label="Periode"
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="xl">
              <Grid.Col md={6}>
                <Select
                  label="Status"
                  placeholder="Select Status"
                  rightSection={<IconChevronDown size={14} />}
                  data={[
                    { value: 'New', label: 'New' },
                    { value: 'Done', label: 'Done' },
                    { value: 'Pending', label: 'Pending' },
                  ]}
                  onChange={(v) => {
                    startTransition(() => {
                      handleInput('status', true)(v);
                    });
                  }}
                  value={input.status}
                />
              </Grid.Col>
            </Grid>
          </div>
          {Payroll && Payroll?.Payrolls.length > 0 ? (
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
        </ScrollArea>
      </form>
    </>
  );
}

export default EditPayrollPage;
