import HeadingTop from '@components/TopComponents/Heading';
import { createStyles, Grid, Text, Select, Textarea } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import useInput from '@hooks/useInput';
import CheckboxList from '@components/Inputs/CheckBox';

const useStyles = createStyles(() => ({
  label: {
    alignItems: 'flex-start',
  },
  cancel: {
    color: 'black',
    height: '56px',
    width: '100%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  root: {
    width: '100%',
    height: '56px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

function ShowRolePage() {
  const { classes } = useStyles();
  const [input, handleInput] = useInput({
    name: '',
    email: '',
  });
  const doSubmit = async () => {};
  return (
    <>
      <HeadingTop
        text="Roles"
        items={[
          { title: 'Permission', href: '/client' },
          { title: 'Roles', href: '' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>

          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col md={6}>
              <Select
                label="Province"
                placeholder="Select Province"
                rightSection={<IconChevronDown size={14} />}
                onChange={() => {
                  handleInput('name', true);
                }}
                disabled
                value={input.name}
                data={[]}
              />
            </Grid.Col>
            <Grid.Col md={6} />
            <Grid.Col md={6}>
              <Textarea
                disabled
                styles={{ input: { height: 'unset !important' } }}
                className={classes.label}
                label="Notes"
                // value={input.notes}
                // // onChange={handleInput('notes')}
                placeholder="Notes"
                minRows={4}
              />
            </Grid.Col>
            <Grid.Col md={6} />
            <Grid.Col md={6}>
              <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
                Permission
              </Text>

              <CheckboxList disabled />
              <CheckboxList disabled />
              <CheckboxList disabled />
            </Grid.Col>
            <Grid.Col md={6} />
          </Grid>
        </div>
      </form>
    </>
  );
}

export default ShowRolePage;
