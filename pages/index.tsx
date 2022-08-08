import { Center, createStyles, Grid, NumberInput, Radio, Select, Text, TextInput, Tooltip } from '@mantine/core';
import { useState } from 'react';


function HomePage(/*props*/) {
  const [value, setValue] = useState('ICE');

  const rightSection = (
    <Text  color="dimmed" size={'sm'} sx={{ cursor: 'help' }}>
      <Center>
        kg
      </Center>
    </Text>
  );

  const rightSectionWheel = (
    <Text  color="dimmed" size={'sm'} sx={{ cursor: 'help' }}>
      <Center>
        mm
      </Center>
    </Text>
  );

  return (
    <>
      <Text style={{ marginTop: "1rem", marginBottom:"1rem" }} size="lg" weight={700}>
        Details
      </Text>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <Select
            label="Manufacturer"
            placeholder="Manufacturer"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Grid.Col>
        <Grid.Col md={6}>
        <Select
            label="Brand"
            placeholder="Brand"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Grid.Col>

        <Grid.Col md={6}>
          <TextInput
            label="Model"
            placeholder="TextInput with custom styles"
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <Select
            label="Body Type"
            placeholder="Body Type"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
          </Grid.Col>
      </Grid>

      <Text style={{ marginTop: "1rem", marginBottom:"1rem" }} size="lg" weight={700}>
        Body & Chasis
      </Text>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <Select
            label="Layout"
            placeholder="Layout"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Grid.Col>
      </Grid>

      <Text style={{ marginTop: "1rem", marginBottom:"1rem" }} size="lg" weight={700}>
        Power
      </Text>
      <Grid gutter="xl">
        <Grid.Col md={6}>
        <Radio.Group
          value={value}
          label="Type"
          spacing="sm"
          onChange={setValue}
          required
        >
          <Radio defaultChecked value="ICE" label="Internal Combustion Engine" color="dark" />
          <Radio value="EV" label="Electric Vehicle" color="dark" />
        </Radio.Group>
        </Grid.Col>
      </Grid>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <Select
            label="Engine/Motor"
            placeholder="Engine/Motor"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Grid.Col>
      </Grid>

      <Text style={{ marginTop: "1rem", marginBottom:"1rem" }} size="lg" weight={700}>
        Dimension
      </Text>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <TextInput
            label="Curb Weight"
            placeholder="Curb Weight"
            rightSection={rightSection}
          />
        </Grid.Col>
        <Grid.Col md={6}>
        <TextInput
            label="Wheelbase"
            placeholder="Wheelbase"
            rightSection={rightSectionWheel}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default HomePage