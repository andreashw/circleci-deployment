import HeadingTop from '@components/TopComponents/Heading';
import { Button, Checkbox, createStyles, Grid, PasswordInput, Text, TextInput } from '@mantine/core';
import useInput from '@hooks/useInput';
import Router, { useRouter } from 'next/router';
import useSWR from 'swr';
import { IRole } from '@contracts/role-interface';
import { Dropdown } from '@components/Inputs/Dropdown';
import { IGetUser, IUser } from '@contracts/user-interface';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';

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

function EditUserPage() {
  const router = useRouter();
  const { classes } = useStyles();
  const id = router.query.id as unknown as number;
  const { data: user, mutate } = useSWR<IGetUser>(`/api/v1/users/${id}`);
  const { data: role } = useSWR<IRole[]>('/api/v1/role/');
  const [input, handleInput] = useInput({
    name: user ? user?.Name : '',
    email: user ? user?.Email : '',
    password: '',
    is_active: user ? user?.IsActive : true,
    role: user ? user?.Roles[0].ID : '',
  });
  console.log('User', user);

  const doSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Input', input);
    const response: IUser | undefined = await fetcher(`/api/v1/users/${id}`, {
      method: 'PATCH',
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        is_active: input.is_active,
        role_id: Number(input.role),
      },
    });
    console.log('Response Edit from API ', response);
    mutate();
    if (response) {
      showNotification({
        title: 'Success',
        message: 'User berhasil diubah',
        color: 'teal',
      });
      Router.replace('/user');
    }
  };
  return (
    <>
      <HeadingTop
        text="Add New Users"
        items={[
          { title: 'Users', href: '/user' },
          { title: 'Add New', href: '' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Add New
          </Text>

          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col md={6}>
              <TextInput label="Name" value={input.name} onChange={handleInput('name')} placeholder="e.g John Doe" />
            </Grid.Col>
            <Grid.Col md={6}>
              <Dropdown
                label="Role"
                value={input.role.toString()}
                data={role?.map(({ ID, name }) => ({ value: ID.toString(), label: name })) || []}
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
            <Grid.Col md={6}>
              <PasswordInput className="PasswordInput" label="Password" onChange={handleInput('password')} />
            </Grid.Col>
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

export default EditUserPage;
