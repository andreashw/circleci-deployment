import ListDetail from '@components/ListDetail';
import HeadingTop from '@components/TopComponents/Heading';
import { Grid, Text } from '@mantine/core';

function AddAutomobile(/*props*/) {
  return (
    <>
      <HeadingTop
        text="Detail Automobile"
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
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Manufacturer" IsiList="Mercedez-Benz" />
          <ListDetail List="Brand" IsiList="Mercedez-Benz" />
          <ListDetail List="Model" IsiList="S110" />
          <ListDetail List="Body Type" IsiList="Sedan" />
          <ListDetail List="Production Year" IsiList="1900-1987" />
        </Grid>
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Body & Chassis
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Layout" IsiList="FR Front engine, rear wheel drive" />
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Power
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail
            List="Type"
            IsiList="FR Front engine, rear wheel driveInternal Combustion Engine"
          />
          <ListDetail List="Engine / Motor" IsiList="V8" />
        </Grid>
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Dimension
        </Text>
        <Grid gutter="xl" className="mb-10">
          <ListDetail List="Curb Weight" IsiList="10 kg" />
          <ListDetail List="Wheel Base" IsiList="10 mm" />
          <ListDetail List="Length" IsiList="100mm (1984-1986)" />
          <ListDetail List="Width" IsiList="100mm (1985-1986)" />
          <ListDetail List="Heigth" IsiList="100mm (1985-1989)" />
          <ListDetail List="Heigth" IsiList="100mm (1987-1991)" />
        </Grid>
      </div>
    </>
  );
}

export default AddAutomobile;
