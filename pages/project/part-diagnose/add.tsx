import { fetcher } from '@api/fetcher';
import { RightSection } from '@components/Inputs/RightSection';
import HeadingTop from '@components/TopComponents/Heading';
import { IProvince } from '@contracts/client-interface';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Image, Select, Text, Textarea, TextInput } from '@mantine/core';
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

  const { data: dataClient } = useSWR<IProvince[]>('/api/v1/projects/clients/');

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
  const dataImages = [
    {
      src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    },
  ];
  return (
    <>
      <HeadingTop
        text="Add New Part Diagnose"
        items={[
          { title: 'Project', href: '' },
          { title: 'Part Diagnose', href: '/project/part-diagnose' },
          { title: 'Add New Part Diagnose', href: '#' },
        ]}
      />

      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>

          <Grid gutter="xl" className="">
            <div className="w-full md:w-1/2">
              <Grid.Col md={12}>
                <Select
                  label="Client"
                  placeholder="Select Client"
                  value={input.client_id.toString()}
                  onChange={handleInput('client_id', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={dataClient ? dataClient.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
                />
              </Grid.Col>
            </div>
          </Grid>
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Parts
          </Text>
          <Grid gutter="xl" className="mb-[48px]">
            <div className="w-full md:w-1/2">
              <Grid.Col md={12}>
                <Select
                  label="Client"
                  placeholder="Select Client"
                  value={input.client_id.toString()}
                  onChange={handleInput('client_id', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={dataClient ? dataClient.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <Select
                  label="Client"
                  placeholder="Select Client"
                  value={input.client_id.toString()}
                  onChange={handleInput('client_id', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={dataClient ? dataClient.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <TextInput
                  label="PIC"
                  placeholder="Select PIC"
                  value={input.pic_id.toString()}
                  onChange={handleInput('pic_id', true)}
                  rightSection={<RightSection label="Pcs" />}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Select
                  label="Client"
                  placeholder="Select Client"
                  value={input.client_id.toString()}
                  onChange={handleInput('client_id', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={dataClient ? dataClient.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <Select
                  label="Client"
                  placeholder="Select Client"
                  value={input.client_id.toString()}
                  onChange={handleInput('client_id', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={dataClient ? dataClient.map((y: any) => ({ value: y.Id.toString(), label: y.Name })) : []}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <TextInput
                  label="PIC"
                  placeholder="Select PIC"
                  value={input.pic_id.toString()}
                  onChange={handleInput('pic_id', true)}
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
              <div className="pl-[12px] md:pl-[122px]">
                <div className="flex  flex-row flex-wrap -mx-2">
                  {dataImages.map((item: any, index: any) => (
                    <div key={index} className="p-2 relative">
                      <div className=" absolute top-2 cursor-pointer right-2 z-10 bg-white rounded-full">
                        <Image
                          radius="md"
                          className="border-2 border-danger rounded-full"
                          src="/icon_delete_img.svg"
                          width={24}
                          height={24}
                        />
                      </div>
                      <Image radius="md" src={item.src} width={80} height={80} />
                    </div>
                  ))}
                  {dataImages.length < 3 && (
                    <div className="p-2 cursor-pointer">
                      <Image
                        radius="md"
                        className="border-2 border-[#828282] rounded-md"
                        src="/icon_add_img.svg"
                        width={80}
                        height={80}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

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
