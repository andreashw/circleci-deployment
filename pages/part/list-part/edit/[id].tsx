import { fetcher } from '@api/fetcher';
import { Dropdown } from '@components/Inputs/Dropdown';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, MultiSelect, Text, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
  input: {
    height: '300px',
  },
}));
function EditListPartPage() {
  const { classes } = useStyles();
  const router = useRouter();

  const { data: dataParts } = useSWR('/api/v1/parts/');

  const [input, handleInput] = useInput({
    name_input: '',
    brand_input: '',
    category: '',
    test: '',
    material_input: '',
    req_pcs_input: '',
    req_unit: 'Pcs',
    vendor: [
      {
        name: '',
      },
    ],
    automobile: [],
  });

  const doSubmit = async (e: any) => {
    e.preventDefault();
    // console.log('input ', input);

    const response = await fetcher('/api/v1/parts/', {
      method: 'POST',
      body: {
        name_input: input.name_input,
        brand_input: input.brand_input,
        category: input.category,
        material_input: input.material_input,
        req_pcs_input: Number(input.req_pcs_input),
        req_unit: input.req_unit,
        vendors: input.vendor,
        automobile: input.automobile,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Part berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/part');
    }
  };
  useEffect(() => {
    // const test = document.querySelector('#test-label')?.nextElementSibling?.childNodes[1].firstChild.text;

    console.log(test);
  }, [router]);

  return (
    <>
      <HeadingTop
        text="Edit List Part"
        items={[
          { title: 'Parts', href: '/part' },
          { title: 'List Parts', href: '/part/list-part' },
          { title: 'Edit List Part', href: '' },
        ]}
      />

      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>
          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col md={6}>
              <Grid.Col md={12}>
                <Dropdown
                  label="Category"
                  placeholder="Select Category"
                  value={input.category}
                  onChange={handleInput('category', true)}
                  data={[
                    { value: 'Body', label: 'Body' },
                    { value: 'Drivetrain', label: 'Drivetrain' },
                  ]}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Dropdown
                  label="Part Name"
                  placeholder="Select Parts"
                  value={input.category}
                  onChange={handleInput('category', true)}
                  data={[
                    { value: 'Body', label: 'Body' },
                    { value: 'Drivetrain', label: 'Drivetrain' },
                  ]}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <MultiSelect
                  id="test"
                  label="Manufactured For"
                  placeholder="Select Automobiles"
                  // value={value}
                  data={dataParts?.map(({ ID, NameInput }: any) => ({ value: ID.toString(), label: NameInput })) || []}
                  onChange={handleInput('automobile', true)}
                  searchable
                  nothingFound="Nothing found"
                  clearButtonLabel="Clear selection"
                  maxDropdownHeight={360}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <TextInput
                  label="Brand"
                  placeholder="Enter Brand"
                  value={input.name_input}
                  onChange={handleInput('name_input')}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <TextInput
                  label="Part Number"
                  placeholder="Enter Part Number"
                  value={input.name_input}
                  onChange={handleInput('name_input')}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Dropdown
                  label="Part Material"
                  placeholder="Select Material"
                  value={input.category}
                  onChange={handleInput('category', true)}
                  data={[
                    { value: 'Body', label: 'Body' },
                    { value: 'Drivetrain', label: 'Drivetrain' },
                  ]}
                />
              </Grid.Col>
            </Grid.Col>

            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className={`${classes.cancel} hover:bg-transparent`} onClick={() => router.back()}>
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

export default EditListPartPage;
