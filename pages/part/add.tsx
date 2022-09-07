import { Button, createStyles, Grid, Select, Text, TextInput } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';

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
function AddPartPage() {
  const { classes } = useStyles();

  return (
    <>
      <div style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Client
        </Text>
      </div>
      <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
        Details
      </Text>

      <Grid gutter="xl" className="mb-[48px]">
        <Grid.Col md={6}>
          <TextInput label="Name" placeholder="e.g Shockbreaker Ohlins" />
        </Grid.Col>

        <Grid.Col md={6}>
          <Select
            label="Category"
            placeholder="Select Category"
            rightSection={<IconChevronDown size={14} />}
            data={[]}
          />
        </Grid.Col>

        <Grid.Col md={6}>
          <TextInput label="Part Brand" placeholder="e.g Dekson" />
        </Grid.Col>

        <Grid.Col md={6}>
          <Select
            label="Part Material"
            placeholder="Part Material"
            rightSection={<IconChevronDown size={14} />}
            data={[]}
          />
        </Grid.Col>

        <Grid.Col md={6}>
          <Select label="Req. Pcs" placeholder="e.g 10" rightSection={<IconChevronDown size={14} />} data={[]} />
        </Grid.Col>
        <Grid.Col md={6} />

        <Grid.Col md={6}>
          <div className="flex flex-row justify-between items-center">
            <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
              Vendor
            </Text>
            <Text className="text-red-600">+ Add Vendor</Text>
          </div>
          <Select label="Vendor" placeholder="Select Vendor" rightSection={<IconChevronDown size={14} />} data={[]} />
        </Grid.Col>
        <Grid.Col md={6} />

        <Grid.Col md={8} />
        <Grid.Col md={2}>
          <Button className={`${classes.cancel} hover:bg-transparent`}>Cancel</Button>
        </Grid.Col>
        <Grid.Col md={2}>
          <Button className={`${classes.root} bg-black hover:bg-black`}>Save</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddPartPage;
