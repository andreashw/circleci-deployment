import { Anchor, Button, Center, createStyles, Grid, NumberInput, Radio, Select, Text, TextInput, Tooltip } from '@mantine/core';
import { Fragment, useState } from 'react';
import { RightSection } from '../../components/Inputs/RightSection';
import { YearRange } from '../../components/Inputs/YearRange';
import { IconChevronDown, IconX } from '@tabler/icons'

function AddEV(/*props*/) {
  const [value, setValue] = useState('ICE');
  const [lengths, setLengths] = useState([
    { 
        length: '',
        startYear: '',
        endYear: '' 
    }
  ]);
  const [widths, setWidths] = useState([
    { 
        width: '',
        startYear: '',
        endYear: '' 
    }
  ]);
  const [heights, setHeights] = useState([
    { 
        height: '',
        startYear: '',
        endYear: '' 
    }
  ]);

  const addLength = () => {
    setLengths(prev=>[...prev, {
        length: '',
        startYear: '',
        endYear: ''
    }])
  }

  const addWidth = () => {
    setWidths(prev=>[...prev, {
        width: '',
        startYear: '',
        endYear: ''
    }])
  }

  const addHeight = () => {
    setHeights(prev=>[...prev, {
        height: '',
        startYear: '',
        endYear: ''
    }])
  }

  const removeLength = (index: number) =>{
    setLengths(prev => prev.filter((x,i)=>i!=index))
  }

  return (
    <>
      <Text className='mt-[1rem] mb-[1rem] text-[20px]' weight={700}>
        Details
      </Text>
      <Grid gutter="xl" className='mb-[48px]'>
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
          <TextInput
            label="Model"
            placeholder="TextInput with custom styles"
          />
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
            <YearRange label='Production Year' />
        </Grid.Col>
      </Grid>

      <Text className='mt-[1rem] mb-[1rem] text-[20px]' size="lg" weight={700}>
        Body & Chasis
      </Text>
      <Grid gutter="xl" className='mb-[48px]'>
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

      <Text className='mt-[1rem] mb-[1rem] text-[20px]' size="lg" weight={700}>
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
          <Radio value="ICE" label="Internal Combustion Engine" color="dark" />
          <Radio value="EV" label="Electric Vehicle" color="dark" />
        </Radio.Group>
        </Grid.Col>
      </Grid>
      <Grid gutter="xl" className='mb-[48px]'>
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

      <Text className='mt-[1rem] mb-[1rem] text-[20px]' size="lg" weight={700}>
        Dimension
      </Text>
      <Grid gutter="xl">
        <Grid.Col md={6}>
          <TextInput
            label="Curb Weight"
            placeholder="Curb Weight"
            rightSection={<RightSection label='kg' />}
          />
        </Grid.Col>
        <Grid.Col md={6}>
        <TextInput
            label="Wheelbase"
            placeholder="Wheelbase"
            rightSection={<RightSection label='mm' />}
          />
        </Grid.Col>
      </Grid>

      {/* Section Length */}
      <div className='flex justify-between flex-row'>

          <Text className='my-4' weight={700}>
              Length
          </Text>

          <Anchor component='button' className='my-4 text-sm text-danger' onClick={addLength}>
              add length +
          </Anchor>
      </div>
      <Grid gutter="xl">
        {
            lengths.map((length, li) => (
                <Fragment key={li}>
                    <Grid.Col md={5.5}>
                    <TextInput
                        label={`Length ${li+1}`}
                        placeholder="Length"
                        rightSection={<RightSection label='mm' />}
                    />
                    </Grid.Col>
                    <Grid.Col md={6} className="flex flex-row items-center">
                        <YearRange label='Production Year' />
                    </Grid.Col>
                    <Grid.Col md={0.5} className={'flex justify-center items-center'} onClick={()=>removeLength(li)}>
                      <IconX size={18} />
                    </Grid.Col>
                </Fragment>
            ))
        }
      </Grid>

      {/* Section Width */}
      <div className='flex justify-between flex-row'>

          <Text className='my-4' weight={700}>
              Width
          </Text>

          <Anchor component='button' className='my-4 text-sm text-danger' onClick={addWidth}>
              add width +
          </Anchor>
      </div>
      <Grid gutter="xl">
        {
          widths.map((width, wi) => (
              <Fragment key={wi}>
                  <Grid.Col md={6}>
                  <TextInput
                      label={`Width ${wi+1}`}
                      placeholder="Width"
                      rightSection={<RightSection label='mm' />}
                  />
                  </Grid.Col>
                  <Grid.Col md={6} className="flex flex-row items-center">
                      <YearRange label='Production Year' />
                  </Grid.Col>
              </Fragment>
          ))
        }
      </Grid>

      {/* Section Height */}
      <div className='flex justify-between flex-row'>

          <Text className='my-4' weight={700}>
              Height
          </Text>

          <Anchor component='button' className='my-4 text-sm text-danger' onClick={addHeight}>
              add height +
          </Anchor>
      </div>
      <Grid gutter="xl" className='mb-[48px]'>
        {
          heights.map((height, hi) => (
              <Fragment key={hi}>
                  <Grid.Col md={6}>
                  <TextInput
                      label={`Height ${hi+1}`}
                      placeholder="Height"
                      rightSection={<RightSection label='mm' />}
                  />
                  </Grid.Col>
                  <Grid.Col md={6} className="flex flex-row items-center">
                      <YearRange label='Production Year' />
                  </Grid.Col>
              </Fragment>
          ))
        }
      </Grid>
    </>
  );
}

export default AddEV