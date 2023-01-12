import { ScrollArea, Drawer, Text, Table, Menu, Button } from '@mantine/core';
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { IProject } from '@contracts/project-interface';

function ProjectPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataVendor, mutate } = useSWR('/api/v1/projects/');

  const onDeleteData = async (project: IProject) => {
    console.log(project.ID);

    const response: IProject | undefined = await fetcher(`/api/v1/projects/${project.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
  };
  function deleteProfile(project: IProject) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{project.name}</b> Project Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(project),
    });
    console.log('====================================');
    // const response: IProject | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }
  console.log('====================================');
  //   console.log(dataPic?.filter((a) => a.ID === 2)[0].Name);
  console.log('====================================');

  const body = () =>
    dataVendor.map((item: any, index: any) => (
      <tr key={index}>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/${item.ID}`)}>
          {item.name}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/project/${item.ID}`)}>
          {item.Client.name}
        </td>
        <td className="cursor-pointer w-2/12 " onClick={() => Router.push(`/project/${item.ID}`)}>
          {item.Pic.name}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/project/${item.ID}`)}>
          {item.Automobile.model} - {item.Automobile.year_start}
        </td>

        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/${item.ID}`)}>
          {item.power_type}
        </td>
        <td>
          <Menu>
            <Menu.Target>
              {/* <Button variant="white" color={'red'}>Action</Button> */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '60px',
                  height: '36px',
                }}
              >
                <IconDotsVertical size={14} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{item.name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/project/edit/${item.ID}`)}>
                Edit Project
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete Project
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
          Project
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/project/add')}>
            Add New Project
          </Button>
        </div>
      </div>
      {dataVendor.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>PIC</th>
                <th>Automobile</th>
                <th>Power Type</th>
                <th />
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
      {/* <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 Project
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div> */}
    </>
  );
}

export default ProjectPage;
