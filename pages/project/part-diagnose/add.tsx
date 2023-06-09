import { fetcher } from '@api/fetcher';
import { RightSection } from '@components/Inputs/RightSection';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Image, Select, Text, Textarea, TextInput, NumberInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import Router from 'next/router';
import { startTransition, useRef } from 'react';
import useSWR from 'swr';
// import imageCompression from 'browser-image-compression';

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
  const upRef = useRef<any>(null);

  const [input, handleInput] = useInput({
    project: '',
    category: '',
    part_name: '',
    qty: '',
    condition: '',
    action: '',
    storage: '',
    notes: '',
    img: [],
    imgFile: [],
  });

  const { data: Project } = useSWR('/api/v1/projects/');
  const { data: Category } = useSWR('/api/v1/item-part/part-categories');
  const { data: PartName } = useSWR(`/api/v1/item-part/?category=${input.category}`);

  const doSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('project_id', input.project);
    formData.append('part_id', input.part_name);
    formData.append('action', input.action);
    formData.append('condition', input.condition);
    formData.append('storage_location', input.storage);
    formData.append('quantity', input.qty);
    formData.append('note', input.notes);

    await Promise.all(
      input.imgFile.map(async (i: any) => {
        formData.append('images', i);
        console.log(i);
      })
    );
    await fetcher('/api/v1/project-part/', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        showNotification({
          title: 'Success',
          message: 'Project berhasil ditambahkan',
          color: 'teal',
        });
        Router.replace('/project/part-diagnose');
      })
      .catch((err) => {
        console.log('tes');
        console.log(err);
        showNotification({
          title: 'ERROR',
          message: err.data.error?.Message,
          color: 'red',
        });
        console.log('====================================');
      });
  };
  console.log('====================================');
  console.log(input);
  console.log('====================================');
  function BTNDeleteImg(item: '') {
    startTransition(() => {
      handleInput('img', true)(input.img.filter((x: any, i: any) => i !== item));
      handleInput('imgFile', true)(input.imgFile.filter((x: any, i: any) => i !== item));
    });
  }

  function handleImageSChange(e: any) {
    if (e.target.files.length) {
      const newFiles: File[] = [];
      const newPrevs: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i] as File;
        const url = URL.createObjectURL(file);
        newFiles.push(file);
        newPrevs.push(url);
      }
      startTransition(() => {
        handleInput('img', true)([...input.img, ...newPrevs]);
        handleInput('imgFile', true)([...input.imgFile, ...newFiles]);
      });
    }
  }
  return (
    <>
      <HeadingTop
        text="Add New Entry"
        items={[
          { title: 'Project', href: '' },
          { title: 'Part Diagnose', href: '/project/part-diagnose' },
          { title: 'Add New Entry', href: '#' },
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
                  label="Project"
                  placeholder="Select Project"
                  value={input.project.toString()}
                  onChange={handleInput('project', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={Project ? Project.map((y: any) => ({ value: y.ID.toString(), label: y.Name })) : []}
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
                  label="Category"
                  placeholder="Select Category"
                  value={input.category.toString()}
                  onChange={(val) =>
                    startTransition(() => {
                      handleInput('category', true)(val);
                      handleInput('part_name', true)('');
                    })
                  }
                  rightSection={<IconChevronDown size={14} />}
                  data={Category ? Category.map((y: any) => ({ value: y.Value, label: y.Label })) : []}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <Select
                  label="Part Name"
                  placeholder="Select Part Name"
                  value={input.part_name.toString()}
                  onChange={(val: any) => {
                    startTransition(() => {
                      handleInput('part_name', true)(val);
                    });
                  }}
                  rightSection={<IconChevronDown size={14} />}
                  data={
                    PartName && input.category
                      ? PartName.map((y: any) => ({
                          value: y.ID.toString(),
                          label: `${y.MasterPart.Name}-${y.Brand}`,
                        }))
                      : []
                  }
                  nothingFound="No options"
                  creatable
                  searchable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={() => {
                    window.open('/expenses');
                    return 'tes';
                  }}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <NumberInput
                  label="Quantity"
                  placeholder="e.g 78"
                  value={input.qty}
                  onChange={handleInput('qty', true)}
                  rightSection={<RightSection label="Pcs" />}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <Select
                  label="Condition"
                  placeholder="Select Condition"
                  value={input.condition.toString()}
                  onChange={handleInput('condition', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={[
                    { label: 'Good', value: 'good' },
                    { label: 'Bad', value: 'bad' },
                  ]}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <Select
                  label="Action"
                  placeholder="Select Action"
                  value={input.action.toString()}
                  onChange={handleInput('action', true)}
                  rightSection={<IconChevronDown size={14} />}
                  data={[
                    { label: 'Use', value: 'use' },
                    { label: 'Restore', value: 'restore' },
                    { label: 'Purchase', value: 'purchase' },
                  ]}
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <TextInput
                  label="Storage Location"
                  placeholder="e.g Rak/03"
                  value={input.storage.toString()}
                  onChange={handleInput('storage')}
                  required
                />
              </Grid.Col>

              <Grid.Col md={12}>
                <Textarea
                  styles={{ input: { height: 'unset !important', width: '100%' } }}
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
                  {input?.img?.map((item: any, index: any) => (
                    <div key={index} className="p-2 relative">
                      <div className=" absolute top-2 cursor-pointer right-2 z-10 bg-white rounded-full">
                        <Image
                          onClick={() => BTNDeleteImg(index)}
                          radius="md"
                          className="border-2 border-danger rounded-full"
                          src="/icon_delete_img.svg"
                          width={24}
                          height={24}
                        />
                      </div>
                      <Image radius="md" src={item} width={80} height={80} />
                    </div>
                  ))}
                  {input?.img?.length < 3 && (
                    <div className="p-2 cursor-pointer" onClick={() => upRef.current.click()}>
                      <input
                        type="file"
                        id="imgupload"
                        ref={upRef}
                        style={{ display: 'none' }}
                        onChange={handleImageSChange}
                      />
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
