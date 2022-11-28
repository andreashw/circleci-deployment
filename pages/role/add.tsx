import HeadingTop from '@components/TopComponents/Heading';
import { Button, createStyles, Grid, Text, Textarea, TextInput } from '@mantine/core';
import useInput from '@hooks/useInput';
import CheckboxList from '@components/Inputs/CheckBox';
import { IListPermission, IPermission } from '@contracts/permission-interface';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

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

function AddRolePage() {
  const { classes } = useStyles();
  const router = useRouter();
  const { data: permissions } = useSWR<IPermission[]>('/api/v1/permission/');
  const [input, handleInput] = useInput({
    name: '',
    desc: '',
  });
  const [permissionIDs, setPermissionIDs] = useState<number[]>([]);
  const [allPermission, setAllPermission] = useState<IListPermission[]>([]);

  useEffect(() => {
    setAllPermission(permissions?.flatMap((item) => item.Permission) || []);
  }, [permissions]);

  const handleCheckBox = (permission: IListPermission, checked: boolean) => {
    setPermissionIDs((prev) => {
      if (permission.name.includes('*')) {
        const checkedPermission = allPermission
          ?.filter((item) => item.name.includes(permission?.name?.replace('*', '')))
          ?.map((item) => item.ID);
        if (checked) {
          return [
            ...prev,
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...checkedPermission,
          ];
        }
        return prev.filter(
          (idPermission) => idPermission !== permission.ID && !checkedPermission.includes(idPermission)
        );
      }
      if (checked) {
        return [...prev, permission.ID];
      }

      // Mendapatkan nama permission yang ada .* sesuai permission yang di uncheck
      const uncheckAllName = permission.name.replace(permission.name.split('.').pop() || '', '*');
      // Cek All Permission yang list permissionnya sesuai ID yang di uncheck
      const uncheckAllID = allPermission.find((item) => item.name === uncheckAllName)?.ID;
      return prev.filter((idPermission) => ![permission.ID, uncheckAllID].includes(idPermission));
    });
  };

  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher('/api/v1/role/', {
      method: 'POST',
      body: {
        name: input.name,
        description: input.desc,
        permissions: permissionIDs,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Role berhasil ditambahkan',
        color: 'teal',
      });
      router.replace('/role');
    }
  };
  return (
    <>
      <HeadingTop
        text="Add New Roles"
        items={[
          { title: 'Role', href: '/role' },
          { title: 'Add New Roles', href: '' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>

          <Grid gutter="xl">
            <Grid.Col md={6}>
              <TextInput label="Name" placeholder="e.g Superadmin" value={input.name} onChange={handleInput('name')} />
            </Grid.Col>
            <Grid.Col md={6} />
            <Grid.Col md={6}>
              <Textarea
                styles={{ input: { height: 'unset !important' } }}
                className={classes.label}
                label="Notes"
                value={input.desc}
                onChange={handleInput('desc')}
                placeholder="Description"
                minRows={4}
              />
            </Grid.Col>
            <Grid.Col md={6} />
            <Grid.Col md={6}>
              <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
                Permission
              </Text>

              <CheckboxList
                permissions={permissions || []}
                onPermissionChange={handleCheckBox}
                permissionIDs={permissionIDs}
              />
            </Grid.Col>
            <Grid.Col md={6} />

            <Grid.Col md={10} />
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

export default AddRolePage;
