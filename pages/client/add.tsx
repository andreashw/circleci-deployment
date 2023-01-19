/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetcher } from '@api/fetcher';
import RegionSelect from '@components/Inputs/RegionSelect';
import HeadingTop from '@components/TopComponents/Heading';
import { IClient, IProvince } from '@contracts/client-interface';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, Textarea, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
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
}));

function ClientsPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const [input, handleInput] = useInput({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    city_id: '',
    province_id: '',
  });
  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher('/api/v1/clients/', {
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
            <Grid.Col md={6}>
              <TextInput label="Name" placeholder="e.g Herjanto" value={input.name} onChange={handleInput('name')} />
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
                styles={{ input: { border: '1px solid #ccc', color: 'red' } }}
                onChange={handleInput('phone')}
                placeholder="e.g 0837xxxxxxxx"
              />
            </Grid.Col>

            <RegionSelect
              onProvinceChange={(v) => {
                startTransition(() => {
                  handleInput('province_id', true)(v);
                  handleInput('city_id', true)('');
                });
              }}
              valProvince={input.province_id}
              valCities={input.city_id}
              onCitiesChange={handleInput('city_id', true)}
              province={provinces ? provinces.map((y) => ({ value: y.ID.toString(), label: y.Name })) : []}
              cities={cities ? cities.map((y) => ({ value: y.ID.toString(), label: y.Name })) : []}
            />

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

export default ClientsPage;
