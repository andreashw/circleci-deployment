import HeadingTop from '@components/TopComponents/Heading';
import { IClient, IProvince } from '@contracts/client-interface';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, Textarea, TextInput } from '@mantine/core';
import Router, { useRouter } from 'next/router';
import useSWR from 'swr';
import { IconChevronDown } from '@tabler/icons';
import { useTransition } from 'react';
import { fetcher } from '@api/fetcher';

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
function EditClientPage() {
  const { classes } = useStyles();

  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Client } = useSWR<IClient[]>(`/api/v1/clients/${id}`);

  const [input, handleInput] = useInput({
    name: Client ? Client[0]?.name : '',
    email: Client ? Client[0]?.email : '',
    phone: Client ? Client[0]?.phone : '',
    address: Client ? Client[0]?.address : '',
    notes: Client ? Client[0]?.notes : '',
    city_id: Client ? Client[0]?.city_id : '',
    province_id: Client ? Client[0]?.province_id : '',
  });

  const [, startTransition] = useTransition();
  const { data: provinces } = useSWR<IProvince[]>(input.province_id !== '' ? '/api/v1/provinces/' : null);
  const { data: cities } = useSWR<IProvince[]>(input.province_id !== '' ? `/api/v1/cities/${input.province_id}` : null);

  const addData = async () => {
    const response: IClient | undefined = await fetcher(`/api/v1/clients/${id}`, {
      method: 'PATCH',
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
              onChange={handleInput('phone')}
              placeholder="e.g 0837xxxxxxxx"
            />
          </Grid.Col>

          <Grid.Col md={6}>
            <Select
              label="Province"
              placeholder="Select Province"
              rightSection={<IconChevronDown size={14} />}
              onChange={(v) => {
                startTransition(() => {
                  handleInput('province_id', true)(v);
                  handleInput('city_id', true)('');
                });
              }}
              value={input.province_id.toString()}
              data={provinces ? provinces.map((y) => ({ value: y.ID.toString(), label: y.name })) : []}
            />
          </Grid.Col>

          <Grid.Col md={6}>
            <Select
              label="City"
              placeholder="Select City"
              rightSection={<IconChevronDown size={14} />}
              onChange={handleInput('city_id', true)}
              value={input.city_id.toString()}
              data={cities ? cities.map((y) => ({ value: y.ID.toString(), label: y.name })) : []}
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

export default EditClientPage;
