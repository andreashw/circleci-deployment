import { fetcher } from '@api/fetcher';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, createStyles, Grid, Select, Text, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import { useRouter } from 'next/router';

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
function EditMasterPartPage() {
  const { classes } = useStyles();
  const router = useRouter();

  const [input, handleInput] = useInput({
    name_input: '',
    brand_input: '',
    category: '',
    material_input: '',
    req_pcs_input: '',
    req_unit: 'Pcs',
    vendor: [
      {
        name: '',
      },
    ],
    automobile: [],
  });

  const doSubmit = async (e: any) => {
    e.preventDefault();
    // console.log('input ', input);

    const response = await fetcher('/api/v1/parts/', {
      method: 'POST',
      body: {
        name_input: input.name_input,
        brand_input: input.brand_input,
        category: input.category,
        material_input: input.material_input,
        req_pcs_input: Number(input.req_pcs_input),
        req_unit: input.req_unit,
        vendors: input.vendor,
        automobile: input.automobile,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Part berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/part');
    }
  };

  return (
    <>
      <HeadingTop
        text="Edit Master Part"
        items={[
          { title: 'Parts', href: '/part' },
          { title: 'Master Parts', href: '/part/master-part' },
          { title: 'Edit Master Part', href: '' },
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
                  data={[
                    { value: 'Body', label: 'Body' },
                    { value: 'Drivetrain', label: 'Drivetrain' },
                  ]}
                />
              </Grid.Col>
              <Grid.Col md={12}>
                <TextInput
                  label="Part Name"
                  placeholder="e.g Shockbreaker Ohlins"
                  value={input.name_input}
                  onChange={handleInput('name_input')}
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

export default EditMasterPartPage;
