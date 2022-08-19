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
          <TextInput label="Name" placeholder="e.g Herjanto" />
        </Grid.Col>
        <Grid.Col md={6}>
          <TextInput label="Email" placeholder="e.g herjanto@gmail.com" />
        </Grid.Col>
        <Grid.Col md={6}>
          <TextInput label="Address" placeholder="e.g Jl. k.h. Agus Salim No.07" />
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
          <Textarea className={classes.label} label="Notes" placeholder="Notes" minRows={4} />
        </Grid.Col>

        <Grid.Col md={8} />
        <Grid.Col md={2}>
          <Button className={`${classes.cancel}`}>Cancel</Button>
        </Grid.Col>
        <Grid.Col md={2}>
          <Button className={`${classes.root} bg-black hover:bg-black`}>Save</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ClientsPage;
