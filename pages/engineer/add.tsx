import { RightSection } from '@components/Inputs/RightSection';
import HeadingTop from '@components/TopComponents/Heading';
import { Button, createStyles, Grid, Select, Text, Textarea, TextInput } from '@mantine/core';
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
function AddEngineerPage() {
  const { classes } = useStyles();
  return (
    <>
      <HeadingTop
        text="Add New Engineers"
        items={[
          { title: 'Mantine', href: '#' },
          { title: 'Mantine hooks', href: '#' },
          { title: 'use-id', href: '#' },
        ]}
      />
      <div className="mx-5">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
          General
        </Text>
        <Grid gutter="xl">
          <Grid.Col md={6}>
            <TextInput label="Name" placeholder="e.g Herjanto" />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput label="Phone Number" placeholder="e.g 0837xxxxxxxx" />
          </Grid.Col>
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
          Account Information
        </Text>
        <Grid gutter="xl">
          <Grid.Col md={6}>
            <Select
              label="Bank Name"
              placeholder="Select Bank"
              rightSection={<IconChevronDown size={14} />}
              data={[]}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput label="Account Number" placeholder="e.g 009348xxxxxx" />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput label="Account Name" placeholder="e.g John Doe" />
          </Grid.Col>
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
          Salary
        </Text>
        <Grid gutter="xl">
          <Grid.Col md={6}>
            <TextInput
              label="Hourly Pay"
              placeholder="e.g 15.000"
              rightSection={<RightSection label="Rp" />}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput
              label="Monthly Equiv"
              placeholder="e.g 3.000.000"
              rightSection={<RightSection label="Rp" />}
            />
          </Grid.Col>
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
          Notes
        </Text>
        <Grid gutter="xl">
          <Grid.Col md={6}>
            <Select
              label="Tanggal Masuk"
              placeholder="Select Date"
              rightSection={<IconChevronDown size={14} />}
              data={[]}
            />
          </Grid.Col>
          <Grid.Col md={12}>
            <Textarea
              styles={{ input: { height: 'unset !important' } }}
              className={classes.label}
              label="Description"
              placeholder="Description"
              minRows={4}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter="xl" className="mb-[48px]">
          <Grid.Col md={8} />
          <Grid.Col md={2}>
            <Button className={`${classes.cancel} hover:bg-transparent`}>Cancel</Button>
          </Grid.Col>
          <Grid.Col md={2}>
            <Button className={`${classes.root} bg-black hover:bg-black`}>Save</Button>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}

export default AddEngineerPage;
