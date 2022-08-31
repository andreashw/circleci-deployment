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
function VendorPage() {
  const { classes } = useStyles();
  return (
    <>
      <HeadingTop
        text="Vendor"
        items={[
          { title: 'Mantine', href: '#' },
          { title: 'Mantine hooks', href: '#' },
          { title: 'use-id', href: '#' },
        ]}
      />
      <div className="mx-5">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>

        <Grid gutter="xl" className="mb-[48px]">
          <Grid.Col md={6}>
            <TextInput label="Name" placeholder="e.g Herjanto" />
          </Grid.Col>

          <Grid.Col md={6}>
            <Select
              label="Type"
              placeholder="Select Type"
              rightSection={<IconChevronDown size={14} />}
              data={[]}
            />
          </Grid.Col>

          <Grid.Col md={6}>
            <TextInput label="Website" placeholder="e.g www.tokopedia.com/erajayabubut" />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput label="Phone Number" placeholder="e.g 0837xxxxxxxx" />
          </Grid.Col>

          <Grid.Col md={6}>
            <Select
              label="City"
              placeholder="Select City"
              rightSection={<IconChevronDown size={14} />}
              data={[]}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Select
              label="Province"
              placeholder="Select Province"
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

export default VendorPage;
