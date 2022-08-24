import {
  Button,
  createStyles,
  Grid,
  Radio,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import { useState } from 'react';

const useStyles = createStyles(() => ({
  label: {
    alignItems: 'flex-start',
  },
  input: {
    height: 'unset',
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
function ProjectPage() {
  const { classes } = useStyles();
  const [value, setValue] = useState('ICE');
  return (
    <>
      <div style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Create Project
        </Text>
      </div>
      <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
        Details
      </Text>

      <Grid gutter="xl" className="mb-[48px]">
        <Grid.Col md={6}>
          <TextInput label="Project Name" placeholder="e.g Opel 1" />
        </Grid.Col>

        <Grid.Col md={6}>
          <Select
            label="Client"
            placeholder="Select Client"
            rightSection={<IconChevronDown size={14} />}
            data={[]}
          />
        </Grid.Col>

        <Grid.Col md={6}>
          <TextInput label="PIC" placeholder="e.g Michael" />
        </Grid.Col>

        <Grid.Col md={6}>
          <Select
            label="Automobile"
            placeholder="Select Automobile"
            rightSection={<IconChevronDown size={14} />}
            data={[]}
          />
        </Grid.Col>

        <Grid.Col md={6}>
          <Radio.Group value={value} label="Type" spacing="sm" onChange={setValue} required>
            <Radio value="ICE" label="Internal Combustion Engine" color="dark" />
            <Radio value="EV" label="Electric Vehicle" color="dark" />
          </Radio.Group>
        </Grid.Col>

        <Grid.Col md={6}>
          <Select
            label="Power"
            placeholder="Select Power"
            rightSection={<IconChevronDown size={14} />}
            data={[]}
          />
        </Grid.Col>

        <Grid.Col md={12}>
          <Textarea
            styles={{ input: { height: 'unset !important' } }}
            className={`${classes.label}`}
            label="Notes"
            placeholder="Notes"
            minRows={4}
          />
        </Grid.Col>

        <Grid.Col md={8} />
        <Grid.Col md={2}>
          <Button className={`${classes.cancel} hover:bg-transparent`}>Cancel</Button>
        </Grid.Col>
        <Grid.Col md={2}>
          <Button className={`${classes.root}  bg-black hover:bg-black`}>Save</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ProjectPage;
