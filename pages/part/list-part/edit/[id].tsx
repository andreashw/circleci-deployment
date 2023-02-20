import { fetcher } from '@api/fetcher';
import { Dropdown } from '@components/Inputs/Dropdown';
import { IconChevronDown } from '@tabler/icons';

import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, MultiSelect, Select, Text, TextInput, NumberInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { startTransition } from 'react';
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
  const id = router.query.id as unknown as number;
  const { data: Part } = useSWR<any>(`/api/v1/item-part/${id}`);

  const [input, handleInput] = useInput({
    category: Part ? Part?.MasterPart?.Category : '',
    part_name: Part ? Part?.MasterPart?.ID : '',
    automobile: Part ? Part?.ManufacturedFor.map((x: any) => x.ID) : [],
    brand: Part ? Part?.Brand : '',
    number: Part ? Part?.Number : '',
    material: Part ? Part?.Material : '',
  });

  const { data: dataAutomobiles } = useSWR('/api/v1/automobiles/');
  const { data: Category } = useSWR('api/v1/item-part/part-categories');
  const { data: Materials } = useSWR('/api/v1/item-part/part-materials');
  const { data: PartName } = useSWR(`/api/v1/master-part/?category=${input.category}`);

  const doSubmit = async (e: any) => {
    e.preventDefault();
    // console.log('input ', input);

    const response = await fetcher(`/api/v1/item-part/${id}`, {
      method: 'PATCH',
      body: {
        brand: input.brand,
        manufactured_for_id: input.automobile,
        master_part_id: input.part_name,
        category: input.category,
        number: Number(input.number),
        material: input.material,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Part berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/part/list-part');
    }
  };

  return (
    <>
      <HeadingTop
        text="Edit List Part"
        items={[
          { title: 'Parts', href: '' },
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
                  onChange={(val) =>
                    startTransition(() => {
                      handleInput('category', true)(val);
                      handleInput('part_name', true)('');
                    })
                  }
                  data={Category?.map(({ Value, Label }: any) => ({ value: Value, label: Label })) || []}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Select
                  label="Part Name"
                  placeholder="Select Parts"
                  rightSection={<IconChevronDown size={14} />}
                  value={input.part_name}
                  onChange={handleInput('part_name', true)}
                  data={PartName?.map(({ Name, ID }: any) => ({ value: ID, label: Name })) || []}
                  searchable
                  nothingFound="No options"
                  required
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <MultiSelect
                  id="test"
                  label="Manufactured For"
                  placeholder="Select Automobiles"
                  value={input.automobile}
                  // data={[]}
                  data={
                    dataAutomobiles?.map((item: any) => ({
                      value: item.ID,
                      label: `${item.AutomobileBrands.Name} ${item.Model} ${item.YearStart} - ${item.YearEnd}`,
                    })) || []
                  }
                  onChange={handleInput('automobile', true)}
                  searchable
                  nothingFound="Nothing found"
                  clearButtonLabel="Clear selection"
                  maxDropdownHeight={360}
                  required
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <TextInput
                  label="Brand"
                  placeholder="Enter Brand"
                  value={input.brand}
                  onChange={handleInput('brand')}
                  required
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <NumberInput
                  label="Part Number"
                  placeholder="Enter Part Number"
                  value={input.number}
                  onChange={handleInput('number', true)}
                  required
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Select
                  label="Part Material"
                  placeholder="Select Material"
                  value={input.material}
                  onChange={handleInput('material', true)}
                  data={Materials?.map(({ Value, Label }: any) => ({ value: Value, label: Label })) || []}
                  required
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
