import { RightSection } from '@components/Inputs/RightSection';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, Grid, NumberInput, Text, Textarea, TextInput } from '@mantine/core';
import banks from '@config/banks.json';
import { useRouter } from 'next/router';
import { DatePicker } from '@mantine/dates';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';
import useSWR from 'swr';
import { IEngineer } from '@contracts/enginers-interface';
import { Dropdown } from '@components/Inputs/Dropdown';

function EditEngineer() {
  const router = useRouter();
  const { id } = router.query;
  const { data: engineer, mutate } = useSWR<IEngineer[]>(`/api/v1/workers/${id}`);
  const optionBanks = banks.map((bank) => ({
    value: bank,
    label: bank,
  }));
  const [input, handleInput] = useInput({
    name: engineer?.[0]?.name,
    phone: engineer?.[0]?.phone,
    bank_name: engineer?.[0]?.bank_name,
    account_name: engineer?.[0]?.account_name,
    account_number: engineer?.[0]?.account_number,
    hourly_pay: engineer?.[0]?.hourly_pay,
    monthly_pay: engineer?.[0]?.monthly_pay,
    first_work_date: engineer?.[0]?.first_work_date,
    note: engineer?.[0]?.note,
  });

  const doSubmit = (e: any) => {
    e.preventDefault();
    fetcher(`/api/v1/workers/${id}`, {
      method: 'PATCH',
      body: input,
    }).then(() => {
      showNotification({
        title: 'Success',
        message: 'Engineer berhasil diedit',
        color: 'teal',
      });
      mutate();
      router.replace('/engineer');
    });
  };
  return (
    <>
      <HeadingTop
        text="Edit Engineer"
        items={[
          { title: 'Engineers', href: '/engineer' },
          { title: 'Edit Engineer', href: '#' },
        ]}
      />

      <form onSubmit={doSubmit}>
        <div className="mx-5">
          <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
            General
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <TextInput
                label="Name"
                placeholder="e.g Herjanto"
                value={input.name}
                onChange={handleInput('name')}
                required
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label="Phone Number"
                placeholder="e.g 0837xxxxxxxx"
                value={input.phone}
                onChange={handleInput('phone')}
                required
              />
            </Grid.Col>
          </Grid>

          <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
            Account Information
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <Dropdown
                label="Bank Name"
                placeholder="Select Bank"
                data={optionBanks}
                onChange={handleInput('bank_name', true)}
                value={input.bank_name}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label="Account Number"
                placeholder="e.g 009348xxxxxx"
                value={input.account_number}
                onChange={handleInput('account_number')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label="Account Name"
                placeholder="e.g John Doe"
                value={input.account_name}
                onChange={handleInput('account_name')}
              />
            </Grid.Col>
          </Grid>

          <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
            Salary
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <NumberInput
                label="Hourly Pay"
                placeholder="e.g 15.000"
                rightSection={<RightSection label="Rp" />}
                value={input.hourly_pay}
                onChange={handleInput('hourly_pay', true)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <NumberInput
                label="Monthly Equiv"
                placeholder="e.g 4.000.000"
                rightSection={<RightSection label="Rp" />}
                value={input.monthly_pay}
                onChange={handleInput('monthly_pay', true)}
              />
            </Grid.Col>
          </Grid>

          <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
            Notes
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <DatePicker
                placeholder="Select Date"
                label="Tanggal Masuk"
                value={input.first_work_date}
                onChange={handleInput('first_work_date', true)}
              />
            </Grid.Col>
            <Grid.Col md={12}>
              <Textarea
                styles={{ input: { height: 'unset !important' } }}
                label="Description"
                placeholder="Description"
                minRows={4}
                value={input.note}
                onChange={handleInput('note')}
              />
            </Grid.Col>
          </Grid>

          <Grid className="mt-10">
            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className="text-black hover:text-white hover:bg-black w-full h-14" onClick={router.back}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col md={2}>
              <Button className="bg-black hover:bg-black w-full h-14" type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default EditEngineer;
