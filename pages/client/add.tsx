import { fetcher } from '@api/fetcher';
import HeadingTop from '@components/TopComponents/Heading';
import { IClient, IProvince } from '@contracts/client-interface';
import { IResponse } from '@contracts/response-interface';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, Textarea, TextInput } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import Router from 'next/router';
import { useEffect, useState } from 'react';
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
}));

function ClientsPage() {
  const { classes } = useStyles();
  const [province, setProvince] = useState<IProvince[]>([]);
  const [cities, setCities] = useState<IProvince[]>([]);

  function fetchProvince() {
    const { data, error } = useSWR<IResponse<IProvince[]>>('/api/v1/provinces/', fetcher);

    return {
      dataProvince: data?.data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const [input, handleInput] = useInput({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    city_id: '',
    province_id: '',
  });
  const addData = async () => {
    const response: IClient | undefined = await fetcher('/api/v1/clients/', {
      method: 'POST',
      body: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address,
        notes: input.notes,
        city_id: Number(input.city_id),
        province_id: Number(input.province_id),
      },
    });
    // eslint-disable-next-line no-console
    console.log('Response from API ', response);
  };

  function fetchCity() {
    const { data, error } = useSWR<IResponse<IProvince[]>>(
      `/api/v1/cities/${Number(input.province_id)}`,
      fetcher
    );

    return {
      dataCities: data?.data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { dataProvince } = fetchProvince();
  const { dataCities } = fetchCity();
  useEffect(() => {
    if (dataProvince) {
      setProvince(dataProvince);
      handleInput('city_id', false);
    }
  }, [dataProvince]);
  useEffect(() => {
    if (dataCities) {
      setCities(dataCities);
    }
  }, [dataCities]);

  return (
    <>
      <HeadingTop
        text="Add New Client"
        items={[
          { title: 'Client', href: '/client' },
          { title: 'Add New Client', href: '' },
        ]}
      />
      <div className="p-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>

        <Grid gutter="xl" className="mb-[48px]">
          <Grid.Col md={6}>
            <TextInput
              label="Name"
              placeholder="e.g Herjanto"
              value={input.name}
              onChange={handleInput('name')}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput
              label="Email"
              value={input.email}
              onChange={handleInput('email')}
              placeholder="e.g herjanto@gmail.com"
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput
              label="Address"
              value={input.address}
              onChange={handleInput('address')}
              placeholder="e.g Jl. k.h. Agus Salim No.07"
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput
              label="Phone Number"
              value={input.phone}
              onChange={handleInput('phone')}
              placeholder="e.g 0837xxxxxxxx"
            />
          </Grid.Col>

          <Grid.Col md={6}>
            <Select
              label="Province"
              placeholder="Select Province"
              rightSection={<IconChevronDown size={14} />}
              onChange={handleInput('province_id', true)}
              data={province.map((y) => ({ value: y.ID.toString(), label: y.name }))}
            />
          </Grid.Col>

          <Grid.Col md={6}>
            <Select
              label="City"
              placeholder="Select City"
              rightSection={<IconChevronDown size={14} />}
              onChange={handleInput('city_id', true)}
              data={cities.map((y) => ({ value: y.ID.toString(), label: y.name }))}
            />
          </Grid.Col>
          <Grid.Col md={12}>
            <Textarea
              styles={{ input: { height: 'unset !important' } }}
              className={classes.label}
              label="Notes"
              value={input.notes}
              onChange={handleInput('notes')}
              placeholder="Notes"
              minRows={4}
            />
          </Grid.Col>

          <Grid.Col md={8} />
          <Grid.Col md={2}>
            <Button className={`${classes.cancel}`} onClick={() => Router.back()}>
              Cancel
            </Button>
          </Grid.Col>
          <Grid.Col md={2}>
            <Button className="bg-black hover:bg-black w-full h-14" onClick={() => addData()}>
              Save
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}

export default ClientsPage;
