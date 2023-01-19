import { Anchor, Button, Grid, NumberInput, Radio, Select, Text, TextInput } from '@mantine/core';
import { Fragment } from 'react';
import { RightSection } from '@components/Inputs/RightSection';
import { YearRange } from '@components/Inputs/YearRange';
import { IconChevronDown } from '@tabler/icons';
import useInput from '@hooks/useInput';
import Trash from 'icons/Trash';
import Plus from 'icons/Plus';
import Router, { useRouter } from 'next/router';
import {
  IAutomobile,
  IAutomobileBodyTypes,
  IAutomobileBrands,
  IAutomobileLayouts,
  IAutomobileManufactures,
} from '@contracts/automobile-interface';
import { fetcher } from '@api/fetcher';
import useSWR from 'swr';
import { Dropdown } from '@components/Inputs/Dropdown';
import HeadingTop from '@components/TopComponents/Heading';

function EditAutomobile(/*props*/) {
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data, mutate } = useSWR<IAutomobile[]>(`/api/v1/automobiles/${id}`);
  const { data: AutomobileBrand } = useSWR<IAutomobileBrands[]>('/api/v1/automobiles-brands/');
  const { data: AutomobileManufacture } = useSWR<IAutomobileManufactures[]>('/api/v1/automobiles-manufactures/');
  const { data: AutomobileLayout } = useSWR<IAutomobileLayouts[]>('/api/v1/automobiles-layouts/');
  const { data: AutomobileBodyType } = useSWR<IAutomobileBodyTypes[]>('/api/v1/automobiles-body-types/');

  const [input, handleInput] = useInput({
    manufacture: data ? data[0]?.AutomobileManufactures.ID : '',
    brand: data ? data[0]?.AutomobileBrands.ID : '',
    body_type: data ? data[0]?.AutomobileBodyTypes.ID : '',
    layout: data ? data[0]?.AutomobileLayouts.ID : '',
    model: data ? data[0]?.Model : '',
    year_start: data ? data[0]?.YearStart : '',
    year_end: data ? data[0]?.YearEnd : '',
    power_type: data ? data[0]?.PowerType : '',
    curb: data ? data[0]?.CurbWight : '',
    wheel: data ? data[0]?.WheelBase : '',
    lengths: data
      ? data[0]?.Lengths
      : [
          {
            length: 0,
            startYear: '',
            endYear: '',
          },
        ],
    widths: data
      ? data[0]?.Widths
      : [
          {
            width: 0,
            startYear: '',
            endYear: '',
          },
        ],
    heights: data
      ? data[0]?.Heights
      : [
          {
            height: 0,
            startYear: '',
            endYear: '',
          },
        ],
  });

  const editData = async () => {
    const response: IAutomobile | undefined = await fetcher(`/api/v1/automobiles/${id}`, {
      method: 'PATCH',
      body: {
        automobile_manufacture_id: Number(input.manufacture),
        automobile_brand_id: Number(input.brand),
        automobile_body_type_id: Number(input.body_type),
        automobile_layout_id: Number(input.layout),
        model: input.model,
        year_start: Number(input.year_start),
        year_end: Number(input.year_end),
        power_type: input.power_type,
        curb_wight: Number(input.curb),
        wheel_base: Number(input.wheel),
        lengths: input.lengths,
        widths: input.widths,
        heights: input.heights,
      },
    });
    console.log('Response Edit from API ', response);
    mutate();
    if (response) {
      Router.replace('/automobile');
    }
  };

  const addLength = () => {
    handleInput(
      'lengths',
      true
    )([
      ...input.lengths,
      {
        length: 0,
        startYear: '',
        endYear: '',
      },
    ]);
  };

  const addWidth = () => {
    handleInput(
      'widths',
      true
    )([
      ...input.widths,
      {
        width: 0,
        startYear: '',
        endYear: '',
      },
    ]);
  };

  const addHeight = () => {
    handleInput(
      'heights',
      true
    )([
      ...input.heights,
      {
        height: 0,
        startYear: '',
        endYear: '',
      },
    ]);
  };

  const removeLength = (index: number) => {
    handleInput('lengths', true)(input.lengths.filter((_: any, i: number) => i !== index));
  };

  const removeWidth = (index: number) => {
    handleInput('widths', true)(input.widths.filter((_: any, i: number) => i !== index));
  };

  const removeHeight = (index: number) => {
    handleInput('heights', true)(input.heights.filter((_: any, i: number) => i !== index));
  };

  const handleInputLength = (index: number) => (val: any) => {
    handleInput(
      'lengths',
      true
    )(
      input.lengths.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            length: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputLengthStartYear = (index: number) => (val: any) => {
    handleInput(
      'lengths',
      true
    )(
      input.lengths.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            startYear: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputLengthEndYear = (index: number) => (val: any) => {
    handleInput(
      'lengths',
      true
    )(
      input.lengths.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            endYear: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputWidth = (index: number) => (val: any) => {
    handleInput(
      'widths',
      true
    )(
      input.widths.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            width: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputWidthStartYear = (index: number) => (val: any) => {
    handleInput(
      'widths',
      true
    )(
      input.widths.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            startYear: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputWidthEndYear = (index: number) => (val: any) => {
    handleInput(
      'widths',
      true
    )(
      input.widths.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            endYear: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputHeight = (index: number) => (val: any) => {
    handleInput(
      'heights',
      true
    )(
      input.heights.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            height: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputHeightStartYear = (index: number) => (val: any) => {
    handleInput(
      'heights',
      true
    )(
      input.heights.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            startYear: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputHeightEndYear = (index: number) => (val: any) => {
    handleInput(
      'heights',
      true
    )(
      input.heights.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            endYear: val,
          };
        }
        return x;
      })
    );
  };

  return (
    <>
      <HeadingTop items={[{ title: 'Automobile', href: '/automobile' }, { title: 'Edit Automobile' }]} />
      <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        {/* <div className="flex flex-row items-center px-6 pb-6" style={{ backgroundColor: 'red' }}> */}
        <div className="pr-5 cursor-pointer" onClick={() => Router.back()}>
          {'<'}
        </div>
        <Text className="cursor-pointer" align="left" weight="bold" size="xl">
          Automobile
        </Text>
      </div>
      <div className="p-6">
        <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
          Details
        </Text>
        <Grid gutter="xl" className="mb-10">
          <Grid.Col md={6}>
            <Dropdown
              label="Manufacture"
              value={input.manufacture.toString()}
              data={AutomobileManufacture?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
              onChange={handleInput('manufacture', true)}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Dropdown
              label="Brand"
              value={input.brand.toString()}
              data={AutomobileBrand?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
              onChange={handleInput('brand', true)}
            />
          </Grid.Col>

          <Grid.Col md={6}>
            <TextInput label="Model" placeholder="e.g W108" value={input.model} onChange={handleInput('model')} />
          </Grid.Col>
          <Grid.Col md={6}>
            <Dropdown
              label="Body Type"
              value={input.body_type.toString()}
              data={AutomobileBodyType?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
              onChange={handleInput('body_type', true)}
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

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
          Body & Chasis
        </Text>
        <Grid gutter="xl" className="mb-10">
          <Grid.Col md={6}>
            <Dropdown
              label="Layout"
              value={input.layout.toString()}
              data={AutomobileLayout?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
              onChange={handleInput('layout', true)}
            />
          </Grid.Col>
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
          Power
        </Text>
        <Grid gutter="xl">
          <Grid.Col md={6}>
            <Radio.Group
              value={input.power_type}
              label="Type"
              spacing="sm"
              onChange={handleInput('power_type', true)}
              required
            >
              <Radio value="ICE" label="Internal Combustion Engine" color="dark" />
              <Radio value="EV" label="Electric Vehicle" color="dark" />
            </Radio.Group>
          </Grid.Col>
        </Grid>
        <Grid gutter="xl" className="mb-10">
          <Grid.Col md={6}>
            <Select
              label="Engine/Motor"
              placeholder="Engine/Motor"
              rightSection={<IconChevronDown size={14} />}
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
          </Grid.Col>
        </Grid>

        <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
          Dimension
        </Text>
        <Grid gutter="xl">
          <Grid.Col md={6}>
            <NumberInput
              label="Curb Weight"
              placeholder="Curb Weight"
              rightSection={<RightSection label="kg" />}
              value={input.curb}
              onChange={handleInput('curb', true)}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <NumberInput
              label="Wheelbase"
              placeholder="Wheelbase"
              rightSection={<RightSection label="mm" />}
              value={input.wheel}
              onChange={handleInput('wheel', true)}
            />
          </Grid.Col>
        </Grid>

        {/* Section Length */}
        {input.lengths.map((length: any, li: number) => (
          <Fragment key={li}>
            <div className="flex justify-between flex-row">
              <Text className="my-4" weight={700}>
                {`Length ${li + 1}`}
              </Text>

              <div className="flex flex-row" style={{}}>
                {li === 0 && (
                  <Anchor
                    component="button"
                    className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                    onClick={addLength}
                  >
                    <div className="flex h-max items-end pb-[3px]">
                      <Plus color="red" width="16" height="16" />
                    </div>
                    <Text className="pl-2">Add length</Text>
                  </Anchor>
                )}
                {li === 0 && input.lengths.length > 1 && <div className="flex items-center px-3">|</div>}
                {(input.lengths.length > 1 || li > 0) && (
                  <Anchor
                    component="button"
                    className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                    onClick={() => removeLength(li)}
                  >
                    <div className="flex h-max items-end pb-[3px]">
                      <Trash color="red" width="16" height="16" />
                    </div>
                    <Text className="pl-2">Delete length</Text>
                  </Anchor>
                )}
              </div>
            </div>
            <Grid gutter="xl">
              <Grid.Col md={6}>
                <NumberInput
                  label="Length"
                  placeholder="Length"
                  rightSection={<RightSection label="mm" />}
                  value={input.lengths[li].length}
                  onChange={handleInputLength(li)}
                />
              </Grid.Col>
              <Grid.Col md={6} className="flex flex-row items-center">
                <YearRange
                  label="Production Year"
                  valStart={input.lengths[li].startYear}
                  valEnd={input.lengths[li].endYear}
                  onStartChange={handleInputLengthStartYear(li)}
                  onEndChange={handleInputLengthEndYear(li)}
                />
              </Grid.Col>
            </Grid>
          </Fragment>
        ))}

        {/* Section Width */}
        {input.widths.map((width: any, wi: number) => (
          <Fragment key={wi}>
            <div className="flex justify-between flex-row">
              <Text className="my-4" weight={700}>
                {`Width ${wi + 1}`}
              </Text>

              <div className="flex flex-row" style={{}}>
                {wi === 0 && (
                  <Anchor
                    component="button"
                    className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                    onClick={addWidth}
                  >
                    <div className="flex h-max items-end pb-[3px]">
                      <Plus color="red" width="16" height="16" />
                    </div>
                    <Text className="pl-2">Add width</Text>
                  </Anchor>
                )}
                {wi === 0 && input.widths.length > 1 && <div className="flex items-center px-3">|</div>}
                {(input.widths.length > 1 || wi > 0) && (
                  <Anchor
                    component="button"
                    className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                    onClick={() => removeWidth(wi)}
                  >
                    <div className="flex h-max items-end pb-[3px]">
                      <Trash color="red" width="16" height="16" />
                    </div>
                    <Text className="pl-2">Delete width</Text>
                  </Anchor>
                )}
              </div>
            </div>
            <Grid gutter="xl">
              <Grid.Col md={6}>
                <NumberInput
                  label="Width"
                  placeholder="Width"
                  rightSection={<RightSection label="mm" />}
                  value={input.widths[wi].width}
                  onChange={handleInputWidth(wi)}
                />{' '}
              </Grid.Col>
              <Grid.Col md={6} className="flex flex-row items-center">
                <YearRange
                  label="Production Year"
                  valStart={input.widths[wi].startYear.toString()}
                  valEnd={input.widths[wi].endYear.toString()}
                  onStartChange={handleInputWidthStartYear(wi)}
                  onEndChange={handleInputWidthEndYear(wi)}
                />
              </Grid.Col>
            </Grid>
          </Fragment>
        ))}

        {/* Section Height */}
        {input.heights.map((height: any, hi: number) => (
          <Fragment key={hi}>
            <div className="flex justify-between flex-row">
              <Text className="my-4" weight={700}>
                {`Height ${hi + 1}`}
              </Text>

              <div className="flex flex-row" style={{}}>
                {hi === 0 && (
                  <Anchor
                    component="button"
                    className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                    onClick={addHeight}
                  >
                    <div className="flex h-max items-end pb-[3px]">
                      <Plus color="red" width="16" height="16" />
                    </div>
                    <Text className="pl-2">Add height</Text>
                  </Anchor>
                )}
                {hi === 0 && input.heights.length > 1 && <div className="flex items-center px-3">|</div>}
                {(input.heights.length > 1 || hi > 0) && (
                  <Anchor
                    component="button"
                    className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                    onClick={() => removeHeight(hi)}
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
                  label="Height"
                  placeholder="Height"
                  rightSection={<RightSection label="mm" />}
                  value={input.heights[hi].height}
                  onChange={handleInputHeight(hi)}
                />
              </Grid.Col>
              <Grid.Col md={6} className="flex flex-row items-center">
                <YearRange
                  label="Production Year"
                  valStart={input.heights[hi].startYear}
                  valEnd={input.heights[hi].endYear}
                  onStartChange={handleInputHeightStartYear(hi)}
                  onEndChange={handleInputHeightEndYear(hi)}
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
            <Button className="bg-black hover:bg-black w-full h-14" onClick={() => editData()}>
              Save
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}

export default EditAutomobile;
