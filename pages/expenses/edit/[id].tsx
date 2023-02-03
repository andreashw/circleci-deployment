/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetcher } from '@api/fetcher';
import RegionSelect from '@components/Inputs/RegionSelect';
import { LeftSection, RightSection } from '@components/Inputs/RightSection';
import HeadingTop from '@components/TopComponents/Heading';
import { IClient, IProvince } from '@contracts/client-interface';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, Textarea, TextInput, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { rp } from '@support/formatter';
import { IconChevronDown } from '@tabler/icons';
import Router, { useRouter } from 'next/router';
import { useEffect, useState, useTransition } from 'react';
import useSWR from 'swr';

const useStyles = createStyles(() => ({
  label: {
    alignItems: 'flex-start',
  },
  cancel: {
    color: 'black',
    height: '56px',
    width: '100%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  root: {
    width: '100%',
    height: '56px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  Input: {
    defaultProps: {
      variant: 'filled',
    },
    classNames: {
      wrapper: 'flex-grow',
      input: 'border-[#121212] mt-0 flex-grow flex bg-red rounded-[8px] h-[48px]',
      // rightSection: 'flex w-[62px] h-100 bg-[#F5F5F5] justify-center align-center rounded-r border border-l-none'
    },
  },
}));

function EditExpendPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const [input, handleInput] = useInput({
    date: '',
    type: '',
    desc: '',
    price: '',
    project: '',
  });
  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher(`/api/v1/expense/${id}`, {
      method: 'PATCH',
      body: {
        date: input.date,
        type: input.type,
        desc: input.desc,
        price: input.price,
        project: input.project,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Client berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/client');
    }
  };

  const [, startTransition] = useTransition();
  const { data: provinces } = useSWR<IProvince[]>('/api/v1/provinces/');
  const { data: cities } = useSWR<IProvince[]>(input.province_id !== '' ? `/api/v1/cities/${input.province_id}` : null);

  const [price, setPrice] = useState('');
  const addCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, '');
  const handleCurChange = (event: any) => handleInput('price', true)(addCommas(removeNonNumeric(event.target.value)));

  return (
    <>
      <HeadingTop
        text="Add New Client"
        items={[
          { title: 'Client', href: '/client' },
          { title: 'Add New Client', href: '' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>

          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col sm={12} md={6}>
              <Grid.Col md={12}>
                <DatePicker
                  placeholder="Select Date"
                  label="Date"
                  inputFormat="DD MMMM YYYY"
                  value={input.date}
                  onChange={handleInput('date', true)}
                  required
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Select
                  label="Type"
                  placeholder="Engine/Motor"
                  rightSection={<IconChevronDown size={14} />}
                  data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                  ]}
                  required
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Textarea
                  styles={{ input: { height: 'unset !important' } }}
                  className={classes.label}
                  label="Description"
                  value={input.notes}
                  onChange={handleInput('desc')}
                  placeholder="Description"
                  minRows={4}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <TextInput
                  id="IconRupiah"
                  label="Amount"
                  placeholder="e.g 15.000"
                  icon={<LeftSection label="Rp" />}
                  value={input.price}
                  onChange={handleCurChange}
                  required
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Select
                  label="Project"
                  placeholder="Engine/Motor"
                  rightSection={<IconChevronDown size={14} />}
                  data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                  ]}
                  required
                />
              </Grid.Col>
            </Grid.Col>

            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className={`${classes.cancel}`} onClick={() => Router.back()}>
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

export default EditExpendPage;
