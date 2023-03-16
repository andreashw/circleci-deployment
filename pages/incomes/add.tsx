/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetcher } from '@api/fetcher';
import { LeftSection, RightSection } from '@components/Inputs/RightSection';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, Textarea, TextInput, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import dayjs from 'dayjs';
import Router, { useRouter } from 'next/router';
import { useTransition } from 'react';
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
    category: '',
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

    const response = await fetcher('/api/v1/income/', {
      method: 'POST',
      body: {
        project_id: Number(input.project),
        category_id: input.category,
        date: dayjs(input.date).format('YYYY-MM-DD'),
        amount: Number(removeNonNumeric(input.price)),
        description: input.desc,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Incomes berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/incomes');
    }
  };

  const [, startTransition] = useTransition();
  const { data: category } = useSWR<any>('/api/v1/income-category/');
  const { data: project } = useSWR<any[]>('/api/v1/projects/');

  return (
    <>
      <HeadingTop
        text="Add New Income"
        items={[
          { title: 'Income', href: '/incomes' },
          { title: 'Add New Income', href: '' },
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
                <Select
                  label="Project"
                  placeholder="Engine/Motor"
                  rightSection={<IconChevronDown size={14} />}
                  data={project ? project.map((y) => ({ value: y.ID.toString(), label: y.Name })) : []}
                  onChange={handleInput('project', true)}
                  required
                />
              </Grid.Col>
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
                  label="Category"
                  placeholder="Engine/Motor"
                  rightSection={<IconChevronDown size={14} />}
                  data={category ? category?.map((y: any) => ({ value: y.ID, label: y.Name })) : []}
                  onChange={handleInput('category', true)}
                  required
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
