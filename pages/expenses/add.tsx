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
import dayjs from 'dayjs';
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

function AddExpendPage() {
  const { classes } = useStyles();
  const router = useRouter();

  const [input, handleInput] = useInput({
    date: '',
    type: '',
    desc: '',
    price: '',
    project: '',
  });
  const addCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, '');
  const handleCurChange = (event: any) => handleInput('price', true)(addCommas(removeNonNumeric(event.target.value)));
  const doSubmit = async (e: any) => {
    e.preventDefault();
    console.log(input.type, input.project, 'cek');

    const response = await fetcher('/api/v1/expense/', {
      method: 'POST',
      body: {
        date: dayjs(input.date).format('YYYY-MM-DD'),
        type: input.type,
        description: input.desc,
        amount: Number(removeNonNumeric(input.price)),
        project_id: Number(input.project),
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Expenses berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/expenses');
    }
  };

  const [, startTransition] = useTransition();
  const { data: type } = useSWR<any[]>('/api/v1/expense/list-types');
  const { data: project } = useSWR<any[]>('/api/v1/projects/');

  return (
    <>
      <HeadingTop
        text="Add New Expense"
        items={[
          { title: 'Expense', href: '/expenses' },
          { title: 'Add New Expense', href: '' },
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
                  data={type ? type.map((y) => ({ value: y.Value, label: y.Value })) : []}
                  onChange={handleInput('type', true)}
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
                  icon={<RightSection label="Rp" />}
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
                  data={project ? project.map((y) => ({ value: y.ID.toString(), label: y.Name })) : []}
                  onChange={handleInput('project', true)}
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

export default AddExpendPage;
