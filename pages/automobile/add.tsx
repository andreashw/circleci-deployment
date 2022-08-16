import { Anchor, Grid, Radio, Select, Text, TextInput } from '@mantine/core';
import { Fragment, useState } from 'react';
import { RightSection } from '@components/Inputs/RightSection';
import { YearRange } from '@components/Inputs/YearRange';
import { IconChevronDown } from '@tabler/icons';
import Trash from 'icons/Trash';
import Plus from 'icons/Plus';

function AddAutomobile(/*props*/) {
  const [value, setValue] = useState('ICE');
  const [lengths, setLengths] = useState([
    {
      length: '',
      startYear: '',
      endYear: '',
    },
  ]);
  const [widths, setWidths] = useState([
    {
      width: '',
      startYear: '',
      endYear: '',
    },
  ]);
  const [heights, setHeights] = useState([
    {
      height: '',
      startYear: '',
      endYear: '',
    },
  ]);

  const addLength = () => {
    setLengths((prev) => [
      ...prev,
      {
        length: '',
        startYear: '',
        endYear: '',
      },
    ]);
  };

  const addWidth = () => {
    setWidths((prev) => [
      ...prev,
      {
        width: '',
        startYear: '',
        endYear: '',
      },
    ]);
  };

  const addHeight = () => {
    setHeights((prev) => [
      ...prev,
      {
        height: '',
        startYear: '',
        endYear: '',
      },
    ]);
  };

  const removeLength = (index: number) => {
    setLengths((prev) => prev.filter((x, i) => i !== index));
  };

  const removeWidth = (index: number) => {
    setWidths((prev) => prev.filter((x, i) => i !== index));
  };

  const removeHeight = (index: number) => {
    setHeights((prev) => prev.filter((x, i) => i !== index));
  };

  return (
    <>
      <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
        Details
      </Text>
      <Grid gutter="xl" className="mb-10">
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
        <Grid.Col md={6}>
          <Select
            label="Brand"
            placeholder="Brand"
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
          <TextInput label="Model" placeholder="TextInput with custom styles" />
        </Grid.Col>
        <Grid.Col md={6}>
          <Select
            label="Body Type"
            placeholder="Body Type"
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

      <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
        Body & Chasis
      </Text>
      <Grid gutter="xl" className="mb-10">
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
      </Grid>

      <Text className="mt-[1rem] mb-[1rem] text-[20px]" size="lg" weight={700}>
        Power
      </Text>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <Radio.Group value={value} label="Type" spacing="sm" onChange={setValue} required>
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
          <TextInput
            label="Curb Weight"
            placeholder="Curb Weight"
            rightSection={<RightSection label="kg" />}
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <TextInput
            label="Wheelbase"
            placeholder="Wheelbase"
            rightSection={<RightSection label="mm" />}
          />
        </Grid.Col>
      </Grid>

      {/* Section Length */}
      {lengths.map((length, li) => (
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
              {li === 0 && lengths.length > 1 && <div className="flex items-center px-3">|</div>}
              {(lengths.length > 1 || li > 0) && (
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
              <TextInput
                label="Length"
                placeholder="Length"
                rightSection={<RightSection label="mm" />}
              />
            </Grid.Col>
            <Grid.Col md={6} className="flex flex-row items-center">
              <YearRange label="Production Year" />
            </Grid.Col>
          </Grid>
        </Fragment>
      ))}

      {/* Section Width */}
      {widths.map((width, wi) => (
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
              {wi === 0 && widths.length > 1 && <div className="flex items-center px-3">|</div>}
              {(widths.length > 1 || wi > 0) && (
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
              <TextInput
                label="Length"
                placeholder="Length"
                rightSection={<RightSection label="mm" />}
              />
            </Grid.Col>
            <Grid.Col md={6} className="flex flex-row items-center">
              <YearRange label="Production Year" />
            </Grid.Col>
          </Grid>
        </Fragment>
      ))}

      {/* Section Height */}
      {heights.map((height, hi) => (
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
              {hi === 0 && heights.length > 1 && <div className="flex items-center px-3">|</div>}
              {(heights.length > 1 || hi > 0) && (
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
          <Grid gutter="xl" className="mb-20">
            <Grid.Col md={6}>
              <TextInput
                label="Length"
                placeholder="Length"
                rightSection={<RightSection label="mm" />}
              />
            </Grid.Col>
            <Grid.Col md={6} className="flex flex-row items-center">
              <YearRange label="Production Year" />
            </Grid.Col>
          </Grid>
        </Fragment>
      ))}
    </>
  );
}

export default AddAutomobile;
