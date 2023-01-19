import { ScrollArea, Drawer, Text, Table } from '@mantine/core';
import { useState } from 'react';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import { IResPermission } from '@contracts/permission-interface';

function ListRolePage() {
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataPermission } = useSWR<IResPermission>('/api/v1/permission/');

  const body = () =>
    dataPermission?.Permissions.map((item, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer">{item.Name}</td>
        <td className="cursor-pointer">
          {item.Roles.map((role) => (
            <text className="whiteColor cursor-pointer bg-[#A18BDF] rounded-lg px-5 py-2 m-1" color="white">
              {role.Name}
            </text>
          ))}
        </td>
      </tr>
    ));

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Permissions
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Permissions" />
        </div>
      </div>
      {dataPermission?.Permissions && dataPermission?.Permissions.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Used in Role</th>
              </tr>
            </thead>
            <tbody>{body()}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text className="my-5" align="center" weight="bold">
          Tidak ada data.
        </Text>
      )}
    </>
  );
}

export default ListRolePage;
