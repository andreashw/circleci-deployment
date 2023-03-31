import HeadingTop from '@components/TopComponents/Heading';
import { Button, Checkbox, createStyles, Grid, Text, TextInput } from '@mantine/core';
import useInput from '@hooks/useInput';
import Router from 'next/router';
import useSWR from 'swr';
import { IRole } from '@contracts/role-interface';
import { Dropdown } from '@components/Inputs/Dropdown';
import { IUser } from '@contracts/user-interface';
import { fetcher } from '@api/fetcher';

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

function AddUserPage() {
  const { classes } = useStyles();
  const { data: role } = useSWR<IRole[]>('/api/v1/role/');
  const [input, handleInput] = useInput({
    name: '',
    email: '',
    password: '',
    is_active: true,
    role: '',
  });
  const doSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Input', input);
    const response: IUser | undefined = await fetcher('/api/v1/users/', {
      method: 'POST',
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        is_active: input.is_active,
        role_id: Number(input.role),
      },
    });
    console.log('Response from API ', response);
    if (response) {
      Router.replace('/user');
    }
  };
  return (
    <>
      <HeadingTop
        text="Add New Entry"
        items={[
          { title: 'Users', href: '/user' },
          { title: 'Add New Entry', href: '' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Add New Entry
          </Text>

          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col md={6}>
              <TextInput label="Name" value={input.name} onChange={handleInput('name')} placeholder="e.g John Doe" />
            </Grid.Col>
            <Grid.Col md={6}>
              <Dropdown
                label="Role"
                data={role?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
                onChange={handleInput('role', true)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label="Email"
                value={input.email}
                onChange={handleInput('email')}
                placeholder="e.g johndoe@gmail.com"
              />
            </Grid.Col>
            {/* <Grid.Col md={6}>
              <PasswordInput className="PasswordInput" label="Password" onChange={handleInput('password')} />
            </Grid.Col> */}
            <Grid.Col md={6} className="flex">
              <Checkbox
                label="User is active"
                color="green"
                checked={input.is_active}
                onChange={(event) => handleInput('is_active', true)(event.currentTarget.checked)}
              />
            </Grid.Col>

            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className={`${classes.cancel}`} onClick={() => Router.back()}>
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

export default AddUserPage;
