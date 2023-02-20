import { fetcher } from '@api/fetcher';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const useStyles = createStyles(() => ({
  label: {
    alignItems: 'flex-start',
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
function AddMasterPartPage() {
  const { classes } = useStyles();
  const router = useRouter();

  const [input, handleInput] = useInput({
    name_input: '',
    category: '',
  });

  const doSubmit = async (e: any) => {
    e.preventDefault();
    // console.log('input ', input);

    await fetcher('/api/v1/master-part/', {
      method: 'POST',
      body: {
        name: input.name_input,
        category: input.category,
      },
    })
      .then((res) => {
        console.log(res);

        showNotification({
          title: 'Success',
          message: 'Master Part berhasil ditambahkan',
          color: 'teal',
        });
        router.replace('/part/master-part');
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: 'error',
          message: err?.data?.error?.Data?.Message,
          color: 'red',
        });
      });
  };

  const { data: category } = useSWR<any[]>('/api/v1/item-part/part-categories');

  return (
    <>
      <HeadingTop
        text="Add New Master Part"
        items={[
          { title: 'Parts', href: '' },
          { title: 'Master Parts', href: '/part/master-part' },
          { title: 'Add New Master Part', href: '' },
        ]}
      />

      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>
          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col md={6}>
              <Grid.Col md={12}>
                <Select
                  label="Category"
                  placeholder="Select Category"
                  rightSection={<IconChevronDown size={14} />}
                  value={input.category}
                  onChange={handleInput('category', true)}
                  data={category ? category.map((y) => ({ value: y.Value, label: y.Value })) : []}
                  required
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <TextInput
                  label="Part Name"
                  placeholder="e.g Shockbreaker Ohlins"
                  value={input.name_input}
                  onChange={handleInput('name_input')}
                  required
                />
              </Grid.Col>
            </Grid.Col>

            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className={`${classes.cancel} hover:bg-transparent`} onClick={() => router.back()}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col md={2}>
              <Button className={`${classes.root} bg-black hover:bg-black`} type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default AddMasterPartPage;
