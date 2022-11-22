import HeadingTop from '@components/TopComponents/Heading';
import { Checkbox, Grid, PasswordInput, Select, Text, TextInput } from '@mantine/core';
import useInput from '@hooks/useInput';
import { IconChevronDown } from '@tabler/icons';

function AddUserPage() {
  const [input, handleInput] = useInput({
    email: '',
    is_active: true,
    roles: '',
  });
  const doSubmit = async () => {};
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
              <TextInput
                label="Email"
                value={input.email}
                onChange={handleInput('email')}
                placeholder="e.g herjanto@gmail.com"
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <PasswordInput className="PasswordInput" label="Password" />
            </Grid.Col>
            <Grid.Col md={6}>
              <Select
                label="Roles"
                placeholder="Roles"
                rightSection={<IconChevronDown size={14} />}
                onChange={handleInput('department', true)}
                data={[
                  { value: '1', label: 'Metalwork' },
                  { value: '2', label: 'Body' },
                  { value: '3', label: 'Mechanical' },
                  { value: '4', label: 'Electrical' },
                  { value: '5', label: 'Upholstery' },
                  { value: '6', label: 'General' },
                  { value: '7', label: 'Blasting' },
                  { value: '8', label: 'Powder Coating' },
                  { value: '9', label: 'Electroplating' },
                ]}
              />
            </Grid.Col>
            <Grid.Col md={6} className="flex">
              <Checkbox
                label="User is active"
                color="green"
                checked={input.is_active}
                onChange={(event) => handleInput('is_active', true)(event.currentTarget.checked)}
              />
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default AddUserPage;
