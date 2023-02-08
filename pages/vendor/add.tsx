import { fetcher } from '@api/fetcher';
import HeadingTop from '@components/TopComponents/Heading';
import { IProvince } from '@contracts/client-interface';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, Textarea, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import { useRouter } from 'next/router';
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
  },
  root: {
    width: '100%',
    height: '56px',
  },
}));
function VendorPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [input, handleInput] = useInput({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    url_website: '',
    country_id: '',
    description: '',
  });
  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher('/api/v1/vendors/', {
      method: 'POST',
      body: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address,
        type: input.type,
        url_website: input.url_website,
        country_id: Number(input.country_id),
        description: input.description,
      },
    });

    if (response) {
      showNotification({
        title: 'Success',
        message: 'Vendor berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/vendor');
    }
  };

  const { data: country } = useSWR<IProvince[]>('/api/v1/countries/');
  return (
    <>
      <HeadingTop
        text="Add New Vendor"
        items={[
          { title: 'Vendor', href: '/vendor' },
          { title: 'Add New Vendor', href: '' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <div className="mx-5">
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
                required
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <Select
                label="Type"
                placeholder="Select Type"
                rightSection={<IconChevronDown size={14} />}
                data={[
                  { value: 'type 1', label: 'Type 1' },
                  { value: 'type 2', label: 'Type 2' },
                  { value: 'type 3', label: 'Type 3' },
                ]}
                onChange={(v) => {
                  startTransition(() => {
                    handleInput('type', true)(v);
                  });
                }}
                value={input.type}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <TextInput
                label="Website"
                value={input.url_website}
                onChange={handleInput('url_website')}
                placeholder="e.g www.tokopedia.com/erajayabubut"
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <Select
                label="Country"
                placeholder="Select Country"
                rightSection={<IconChevronDown size={14} />}
                onChange={(v) => {
                  startTransition(() => {
                    handleInput('country_id', true)(v);
                  });
                }}
                value={input.country_id}
                data={country ? country.map((y) => ({ value: y.ID.toString(), label: y.Name })) : []}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label="Address"
                value={input.address}
                onChange={handleInput('address')}
                placeholder="e.g jl. k.h. agus salim no.07"
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label="Email"
                value={input.email}
                onChange={handleInput('email')}
                placeholder="e.g erajayabubut@gmail.com"
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

            <Grid.Col md={6} />
            <Grid.Col md={12}>
              <Textarea
                styles={{ input: { height: 'unset !important' } }}
                className={classes.label}
                label="Description"
                value={input.description}
                onChange={handleInput('description')}
                placeholder="Description"
                minRows={4}
              />
            </Grid.Col>
            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className={`${classes.cancel} hover:bg-transparent`} onClick={router.back}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col md={2}>
              <Button className={`${classes.root} bg-black hover:bg-black`} type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default VendorPage;
