import { Anchor, Button, Grid, NumberInput, Radio, Select, Text, TextInput } from '@mantine/core';
import { Fragment } from 'react';
import { RightSection } from '@components/Inputs/RightSection';
import { YearRange } from '@components/Inputs/YearRange';
import { IconChevronDown } from '@tabler/icons';
import Plus from 'icons/Plus';
import Trash from 'icons/Trash';
import HeadingTop from '@components/TopComponents/Heading';
import Router from 'next/router';
import useInput from '@hooks/useInput';
import { IAutomobileLayouts, IAutomobileManufactures } from '@contracts/automobile-interface';
import useSWR from 'swr';
import { Dropdown } from '@components/Inputs/Dropdown';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';

function AddEngine(/*props*/) {
  const { data: EngineManufacture } = useSWR<IAutomobileManufactures[]>('/api/v1/engine-manufactures/');
  const { data: EngineLayout } = useSWR<IAutomobileLayouts[]>('/api/v1/engine-layouts/');
  const [input, handleInput] = useInput({
    engine_name: '',
    manufacture: '',
    layout: '',
    year_start: '',
    year_end: '',
    engine_type: 'Normal',
    fuel_type: 'Gasoline',
    displacements: [
      {
        displacement: 0,
        torque_output: 0,
        power: 0,
      },
    ],
    cylinder_bores: [
      {
        cylinder_bore: 0,
      },
    ],
    transmissions: [
      {
        transmission: '',
        no_gear: '',
      },
    ],
  });

  const addDisplacement = () => {
    handleInput(
      'displacements',
      true
    )([
      ...input.displacements,
      {
        displacement: 0,
        torque_output: 0,
        power: 0,
      },
    ]);
  };

  const removeDisplacement = (index: number) => {
    handleInput('displacements', true)(input.displacements.filter((_: any, i: number) => i !== index));
  };

  const handleInputDisplacement = (index: number) => (val: any) => {
    handleInput(
      'displacements',
      true
    )(
      input.displacements.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            displacement: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputPower = (index: number) => (val: any) => {
    handleInput(
      'displacements',
      true
    )(
      input.displacements.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            power: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputTorque = (index: number) => (val: any) => {
    handleInput(
      'displacements',
      true
    )(
      input.displacements.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            torque_output: val,
          };
        }
        return x;
      })
    );
  };

  const addCylinderBore = () => {
    handleInput(
      'cylinder_bores',
      true
    )([
      ...input.cylinder_bores,
      {
        cylinder_bore: 0,
      },
    ]);
  };

  const removeCylinderBore = (index: number) => {
    handleInput('cylinder_bores', true)(input.cylinder_bores.filter((_: any, i: number) => i !== index));
  };

  const handleInputCylinderBore = (index: number) => (val: any) => {
    handleInput(
      'cylinder_bores',
      true
    )(
      input.cylinder_bores.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            cylinder_bore: val,
          };
        }
        return x;
      })
    );
  };

  const addTransmission = () => {
    handleInput(
      'transmissions',
      true
    )([
      ...input.transmissions,
      {
        transmission: '',
        no_gear: '',
      },
    ]);
  };

  const removeTransmission = (index: number) => {
    handleInput('transmissions', true)(input.transmissions.filter((_: any, i: number) => i !== index));
  };

  const handleInputTransmission = (index: number) => (val: any) => {
    handleInput(
      'transmissions',
      true
    )(
      input.transmissions.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            transmission: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputGear = (index: number) => (val: any) => {
    handleInput(
      'transmissions',
      true
    )(
      input.transmissions.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            no_gear: val,
          };
        }
        return x;
      })
    );
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

  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher('/api/v1/engines/', {
      method: 'POST',
      body: {
        name: input.engine_name,
        engine_manufacture_id: Number(input.manufacture),
        engine_layout_id: Number(input.layout),
        displacements: input.displacements,
        transmissions: input.transmissions,
        year_start: Number(input.year_start),
        year_end: Number(input.year_end),
        engine_type: input.engine_type,
        fuel_type: input.fuel_type,
        cylinder_bores: input.cylinder_bores,
      },
    });

    if (response) {
      showNotification({
        title: 'Success',
        message: 'Engine berhasil ditambahkan',
        color: 'teal',
      });
      Router.replace('/engine');
    }
  };

  return (
    <>
      <HeadingTop items={[{ title: 'Engine', href: '/engine' }, { title: 'Add Engine' }]} />
      <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <div className="pr-5 cursor-pointer" onClick={() => Router.back()}>
          {'<'}
        </div>
        <Text className="cursor-pointer" align="left" weight="bold" size="xl">
          Engine
        </Text>
      </div>

      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>
          <Grid gutter="xl" className="mb-10">
            <Grid.Col md={6}>
              <TextInput
                label="Engine Name"
                placeholder="e.g v8"
                value={input.engine_name}
                onChange={handleInput('engine_name')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <Dropdown
                label="Manufacture"
                data={EngineManufacture?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
                onChange={handleInput('manufacture', true)}
              />
            </Grid.Col>
            <Grid.Col md={6} className="flex flex-row items-center">
              <YearRange
                label="Production Year"
                valStart={input.year_start}
                valEnd={input.year_end}
                onStartChange={handleInput('year_start', true)}
                onEndChange={handleInput('year_end', true)}
              />
            </Grid.Col>
          </Grid>

          {/* Section Displacement */}
          {input.displacements.map((displacement: any, di: number) => (
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
                  {di === 0 && input.displacements.length > 1 && <div className="flex items-center px-3">|</div>}
                  {(input.displacements.length > 1 || di > 0) && (
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
                  <NumberInput
                    label="Displacement"
                    placeholder="e.g 300"
                    rightSection={displacementRight}
                    value={input.displacements[di].displacement}
                    onChange={handleInputDisplacement(di)}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <NumberInput
                    label="Power"
                    placeholder="e.g 300"
                    rightSection={displacementRight}
                    value={input.displacements[di].power}
                    onChange={handleInputPower(di)}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <NumberInput
                    label="Torque Output"
                    placeholder="e.g 300"
                    rightSection={displacementRight}
                    value={input.displacements[di].torque_output}
                    onChange={handleInputTorque(di)}
                  />
                </Grid.Col>
              </Grid>
            </Fragment>
          ))}

          <Text className="mt-10 mb-4 text-xl" size="lg" weight={700}>
            General
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <Dropdown
                label="Layout"
                data={EngineLayout?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
                onChange={handleInput('layout', true)}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <Radio.Group
                value={input.engine_type}
                label="Type"
                spacing="xl"
                onChange={handleInput('engine_type', true)}
                required
              >
                <Radio value="Normal" label="Normal" color="dark" />
                <Radio value="turbocharged" label="Turbocharged" color="dark" />
                <Radio value="supercharged" label="Supercharged" color="dark" />
              </Radio.Group>
            </Grid.Col>
          </Grid>
          <Grid gutter="xl" className="mb-10">
            <Grid.Col md={6}>
              <Radio.Group
                value={input.fuel_type}
                label="Fuel Type"
                spacing="xl"
                onChange={handleInput('fuel_type', true)}
                required
              >
                <Radio value="Gasoline" label="Internal Combustion Engine" color="dark" />
                <Radio value="Diesel" label="Electric Vehicle" color="dark" />
              </Radio.Group>
            </Grid.Col>
          </Grid>

          <Text className="mt-[1rem] text-[20px]" size="lg" weight={700}>
            Cylinder Bore
          </Text>
          {/* Section Cylinder Bores */}
          {input.cylinder_bores.map((cylinderBore: any, ci: number) => (
            <Fragment key={ci}>
              <Grid>
                <Grid.Col md={6}>
                  <div className="flex justify-end">
                    <div className="flex flex-row">
                      {ci === 0 && (
                        <Anchor
                          component="button"
                          className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                          onClick={addCylinderBore}
                        >
                          <div className="flex h-max items-end pb-[3px]">
                            <Plus color="red" width="16" height="16" />
                          </div>
                          <Text className="pl-2">Add Cylinder Bore</Text>
                        </Anchor>
                      )}
                      {ci === 0 && input.cylinder_bores.length > 1 && <div className="flex items-center px-3">|</div>}
                      {(input.cylinder_bores.length > 1 || ci > 0) && (
                        <Anchor
                          component="button"
                          className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                          onClick={() => removeCylinderBore(ci)}
                        >
                          <div className="flex h-max items-end pb-[3px]">
                            <Trash color="red" width="16" height="16" />
                          </div>
                          <Text className="pl-2">Delete Cylinder Bore</Text>
                        </Anchor>
                      )}
                    </div>
                  </div>
                </Grid.Col>
              </Grid>
              <Grid gutter="xl">
                <Grid.Col md={6}>
                  <NumberInput
                    label="Cylinder Bore"
                    placeholder="Cylinder Bore"
                    rightSection={<RightSection label="mm" />}
                    value={input.cylinder_bores[ci].cylinder_bore}
                    onChange={handleInputCylinderBore(ci)}
                  />
                </Grid.Col>
              </Grid>
            </Fragment>
          ))}

          <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
            Transmission
          </Text>
          {/* Section Transmissions */}
          {input.transmissions.map((transmission: any, ti: number) => (
            <Fragment key={ti}>
              <div className="flex justify-between flex-row">
                <Text className="my-4" weight={700}>
                  {`Transmission ${ti + 1}`}
                </Text>

                <div className="flex flex-row" style={{}}>
                  {ti === 0 && (
                    <Anchor
                      component="button"
                      className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                      onClick={addTransmission}
                    >
                      <div className="flex h-max items-end pb-[3px]">
                        <Plus color="red" width="16" height="16" />
                      </div>
                      <Text className="pl-2">Add transmission</Text>
                    </Anchor>
                  )}
                  {ti === 0 && input.transmissions.length > 1 && <div className="flex items-center px-3">|</div>}
                  {(input.transmissions.length > 1 || ti > 0) && (
                    <Anchor
                      component="button"
                      className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                      onClick={() => removeTransmission(ti)}
                    >
                      <div className="flex h-max items-end pb-[3px]">
                        <Trash color="red" width="16" height="16" />
                      </div>
                      <Text className="pl-2">Delete transmission</Text>
                    </Anchor>
                  )}
                </div>
              </div>
              <Grid gutter="xl">
                <Grid.Col md={6}>
                  <Select
                    label="Transmission"
                    placeholder="Transmission"
                    rightSection={<IconChevronDown size={14} />}
                    value={input.transmissions[ti].transmission}
                    onChange={handleInputTransmission(ti)}
                    data={[
                      { value: 'Automatic', label: 'Automatic' },
                      { value: 'Manual', label: 'Manual' },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col md={6} className="flex flex-row items-center">
                  <Select
                    label="No. of Gear"
                    placeholder="No. of Gear"
                    rightSection={<IconChevronDown size={14} />}
                    value={input.transmissions[ti].no_gear}
                    onChange={handleInputGear(ti)}
                    data={[
                      { value: '0', label: '0' },
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
            </Fragment>
          ))}

          <Grid className="mt-10">
            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className="bg-black hover:bg-black w-full h-14" onClick={() => Router.back()}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col md={2}>
              <Button className="bg-black hover:bg-black w-full h-14" type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default AddEngine;
