import { Anchor, Grid, Radio, Select, Text, TextInput } from '@mantine/core';
import { Fragment, useState } from 'react';
import { RightSection } from '@components/Inputs/RightSection';
import { YearRange } from '@components/Inputs/YearRange';
import { IconChevronDown } from '@tabler/icons';
import Plus from 'icons/Plus';
import Trash from 'icons/Trash';

function AddEngine(/*props*/) {
  const [generalType, setGeneralType] = useState('normal');
  const [fuelType, setFuelType] = useState('gasoline');
  const [displacements, setDisplacements] = useState([
    {
      displacement: '',
      power: '',
      torqueopt: '',
    },
  ]);

  const addDisplacement = () => {
    setDisplacements((prev) => [
      ...prev,
      {
        displacement: '',
        power: '',
        torqueopt: '',
      },
    ]);
  };

  const removeDisplacement = (index: number) => {
    setDisplacements((prev) => prev.filter((x, i) => i !== index));
  };

  const displacementRight = (
    <Select
      data={[
        { value: 'cc', label: 'CC' },
        { value: 'nm', label: 'Nm' },
        { value: 'hp', label: 'HP' },
      ]}
      rightSection={<IconChevronDown size={14} />}
    />
  );

  return (
    <>
      <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
        Details
      </Text>
      <Grid gutter="xl" className="mb-10">
        <Grid.Col md={6}>
          <TextInput label="Model" placeholder="TextInput with custom styles" />
        </Grid.Col>
        <Grid.Col md={6}>
          <Select
            label="Manufacturer"
            placeholder="Manufacturer"
            rightSection={<IconChevronDown size={14} />}
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
        </Grid.Col>
        <Grid.Col md={6} className="flex flex-row items-center">
          <YearRange label="Production Year" />
        </Grid.Col>
      </Grid>

      {/* Section Displacement */}
      {displacements.map((displacement, di) => (
        <Fragment key={di}>
          <div className="flex justify-between flex-row">
            <Text className="my-4" weight={700}>
              {`Displacement ${di + 1}`}
            </Text>

            <div className="flex flex-row" style={{}}>
              {di === 0 && (
                <Anchor
                  component="button"
                  className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                  onClick={addDisplacement}
                >
                  <div className="flex h-max items-end pb-[3px]">
                    <Plus color="red" width="16" height="16" />
                  </div>
                  <Text className="pl-2">Add Displacement</Text>
                </Anchor>
              )}
              {di === 0 && displacements.length > 1 && (
                <div className="flex items-center px-3">|</div>
              )}
              {(displacements.length > 1 || di > 0) && (
                <Anchor
                  component="button"
                  className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                  onClick={() => removeDisplacement(di)}
                >
                  <div className="flex h-max items-end pb-[3px]">
                    <Trash color="red" width="16" height="16" />
                  </div>
                  <Text className="pl-2">Delete height</Text>
                </Anchor>
              )}
            </div>
          </div>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <TextInput
                label="Displacement"
                placeholder="Displacement"
                rightSection={displacementRight}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput label="Power" placeholder="Power" rightSection={displacementRight} />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput label="Torque" placeholder="Torque" rightSection={displacementRight} />
            </Grid.Col>
          </Grid>
        </Fragment>
      ))}

      <Text className="mt-10 mb-4 text-xl" size="lg" weight={700}>
        General
      </Text>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <Select
            label="Layout"
            placeholder="Layout"
            rightSection={<IconChevronDown size={14} />}
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
            label="Cynlinder Bore"
            placeholder="Cynlinder Bore"
            rightSection={<RightSection label="mm" />}
          />
        </Grid.Col>
      </Grid>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <Radio.Group
            value={generalType}
            label="Type"
            spacing="xl"
            onChange={setGeneralType}
            required
          >
            <Radio value="normal" label="Normal" color="dark" />
            <Radio value="turbocharged" label="Turbocharged" color="dark" />
            <Radio value="supercharged" label="Supercharged" color="dark" />
          </Radio.Group>
        </Grid.Col>
      </Grid>
      <Grid gutter="xl" className="mb-10">
        <Grid.Col md={6}>
          <Radio.Group value={fuelType} label="Type" spacing="xl" onChange={setFuelType} required>
            <Radio value="gasoline" label="Internal Combustion Engine" color="dark" />
            <Radio value="diesel" label="Electric Vehicle" color="dark" />
          </Radio.Group>
        </Grid.Col>
      </Grid>

      <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
        Transmission
      </Text>
      <Grid gutter="xl" className="mb-10">
        <Grid.Col md={6}>
          <Select
            label="Transmission"
            placeholder="Transmission"
            rightSection={<IconChevronDown size={14} />}
            data={[
              { value: 'matic', label: 'Matic' },
              { value: 'manual', label: 'Manual' },
            ]}
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <Select
            label="No. of Gear"
            placeholder="No. of Gear"
            rightSection={<IconChevronDown size={14} />}
            data={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
              { value: '6', label: '6' },
              { value: '7', label: '7' },
              { value: '8', label: '8' },
            ]}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddEngine;
