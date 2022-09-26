import { ScrollArea, Drawer, Text, Table, Grid, Button } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import { DatePicker } from '@mantine/dates';
import HeadingTop from '@components/TopComponents/Heading';

function AddPayrollPage() {
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataClients } = useSWR('/api/v1/clients/');

  const body = () =>
    dataClients.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.name}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.email}
        </td>
        <td className="cursor-pointer   w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.City.name}
        </td>
        <td className="cursor-pointer text-end  w-2/12" onClick={() => Router.push(`/client/${item.ID}`)}>
          {item.phone}
        </td>
      </tr>
    ));

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
      <div className="p-6">
        <Grid gutter="xl">
          <Grid.Col md={6}>
            <div className="flex">
              <DatePicker placeholder="Select Date" label="Periode" />
              <p className="p-3">-</p>
              <DatePicker placeholder="Select Date" />
            </div>
          </Grid.Col>
          <Grid.Col md={6}>
            <DatePicker placeholder="Select Date" label="Periode" />
          </Grid.Col>
        </Grid>
      </div>
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
            <tr>
              <td className="p-6 font-bold"> </td>
              <td className="p-6"> </td>
              <th> </th>
              <th>
                <Button className="bg-black hover:bg-black w-full h-14" onClick={() => {}}>
                  Generate
                </Button>
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

export default AddPayrollPage;
