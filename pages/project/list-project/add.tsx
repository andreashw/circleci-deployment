import { fetcher } from '@api/fetcher';
import HeadingTop from '@components/TopComponents/Heading';
import { IProvince } from '@contracts/client-interface';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Radio, Select, Text, Textarea, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import Router from 'next/router';
import useSWR from 'swr';

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
function ProjectAddPage() {
  const { classes } = useStyles();

  const { data: dataPic } = useSWR<IProvince[]>('/api/v1/projects/pic/');
  const { data: dataAutomobile } = useSWR<IProvince[]>('/api/v1/projects/automobiles/');
  const { data: dataClient } = useSWR<IProvince[]>('/api/v1/projects/clients/');
  const { data: dataPower } = useSWR<IProvince[]>('/api/v1/projects/powers/');

  const [input, handleInput] = useInput({
    name: '',
    pic_id: '',
    client_id: '',
    automobile_id: '',
    notes: '',
    engine_id: '',
    power_type: 'EV',
  });
  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher('/api/v1/projects/', {
      method: 'POST',
      body: {
        name: input.name,
        client_id: Number(input.client_id),
        pic_id: Number(input.pic_id),
        automobile_id: Number(input.automobile_id),
        engine_id: Number(input.engine_id),
        power_type: input.power_type,
        notes: input.notes,
      },
    });

    if (response) {
      showNotification({
        title: 'Success',
        message: 'Project berhasil ditambahkan',
        color: 'teal',
      });
      Router.replace('/project');
    }
  };
  return (
    <>
      <HeadingTop
        text="Add New Project"
        items={[
          { title: 'Project', href: '' },
          { title: 'List Project', href: '/project/list-project' },
          { title: 'Add New Project', href: '#' },
        ]}
      />

      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>

          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col md={6}>
              <TextInput
                label="Project Name"
                placeholder="e.g Opel 1"
                value={input.name}
                onChange={handleInput('name')}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <Select
                label="Client"
                placeholder="Select Client"
                value={input.client_id.toString()}
                onChange={handleInput('client_id', true)}
                rightSection={<IconChevronDown size={14} />}
                data={dataClient ? dataClient.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <Select
                label="PIC"
                placeholder="Select PIC"
                value={input.pic_id.toString()}
                onChange={handleInput('pic_id', true)}
                rightSection={<IconChevronDown size={14} />}
                data={dataPic ? dataPic.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <Select
                label="Automobile"
                placeholder="Select Automobile"
                value={input.automobile_id.toString()}
                onChange={handleInput('automobile_id', true)}
                rightSection={<IconChevronDown size={14} />}
                data={dataAutomobile ? dataAutomobile.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
              />
            </Grid.Col>

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

            <Grid.Col md={6}>
              <Select
                label="Power"
                placeholder="Select Power"
                value={input.engine_id.toString()}
                onChange={handleInput('engine_id', true)}
                rightSection={<IconChevronDown size={14} />}
                data={dataPower ? dataPower.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
              />
            </Grid.Col>

            <Grid.Col md={12}>
              <Textarea
                styles={{ input: { height: 'unset !important' } }}
                className={`${classes.label}`}
                label="Notes"
                value={input.notes}
                onChange={handleInput('notes')}
                placeholder="Notes"
                minRows={4}
              />
            </Grid.Col>

            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className={`${classes.cancel} hover:bg-transparent`} onClick={() => Router.back()}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col md={2}>
              <Button className={`${classes.root}  bg-black hover:bg-black`} type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default ProjectAddPage;
