import { ScrollArea, Drawer, Text, Table, Menu, Button, Checkbox, Tooltip } from '@mantine/core';
import { startTransition, useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { IProject } from '@contracts/project-interface';
import { Th } from 'pages/expenses';
import useInput from '@hooks/useInput';

function PartDiagnosePage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const { data: dataVendor, mutate } = useSWR('/api/v1/project-part/');

  const [idSpec, setIdspec] = useState<any>([]);
  const [SelectBTNBool, setSelectBTNBool] = useState(true);
  const [checkedBTNBool, setCheckedBTNBool] = useState(false);

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
          Delete <b>{project.Name}</b> Project Data ?
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
        {!SelectBTNBool && (
          <td className="w-8">
            <Checkbox
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChange={(e) => {
                if (idSpec.includes(item?.ID)) {
                  setIdspec(idSpec.filter((id: number) => id !== item?.ID));
                } else {
                  setIdspec([...idSpec, item.ID]);
                }
              }}
              checked={idSpec.includes(item.ID)}
            />
          </td>
        )}
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/list-project/${item.ID}`)}>
          {item.Name}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/project/list-project/${item.ID}`)}>
          {item.Client.Name}
        </td>
        <td className="cursor-pointer w-2/12 " onClick={() => Router.push(`/project/list-project/${item.ID}`)}>
          {item.PIC.Name}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/project/list-project/${item.ID}`)}>
          {item.Automobile.Model} - {item.Automobile.year_start}
        </td>

        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/list-project/${item.ID}`)}>
          {item.PowerType}
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
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/project/list-project/edit/${item.ID}`)}>
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

  const [input, handleInput] = useInput({
    search: '',
    type: '',
    start_amound: '',
    end_amound: '',
    selectedId: '',
    start_date: '',
    end_date: '',
    fillter_type: [],
    fillter_project: [],
  });

  function btnSearch(search: any) {
    startTransition(() => {
      console.log('====================================');
      console.log(input);
      console.log('====================================');
      handleInput('search', true)(search);
    });
  }

  const [sortBy, setSortBy] = useState<any>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  function Urutkan(option: string) {
    console.log(option, reverseSortDirection);
    console.log(sortBy === option);
    setSortBy(option);
    if (option === 'ProjectName') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc1');
        // setSortBy(sortBy);
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('name asc');
        });
      } else {
        console.log(option, 'dsc2');
        setReverseSortDirection((old) => !old);

        startTransition(() => {
          handleInput('sortBy', true)('name desc');
        });
      }
    }

    if (option === 'Category') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('category asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('category desc');
        });
      }
    }
    if (option === 'PartName') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('part_name asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('part_name desc');
        });
      }
    }
    if (option === 'Qty') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('qty asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('qty desc');
        });
      }
    }
    if (option === 'Condition') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('condition asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('condition desc');
        });
      }
    }
    if (option === 'Action') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('action asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('action desc');
        });
      }
    }
    if (option === 'Storage') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('storage asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('storage desc');
        });
      }
    }
    if (option === 'Notes') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('notes asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('notes desc');
        });
      }
    }
  }

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Part Diagnose
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Expenses" onSubmit={btnSearch} />
          {SelectBTNBool ? (
            <>
              <Button className="bg-black hover:bg-black px-6 " onClick={() => setSelectBTNBool(!SelectBTNBool)}>
                Select
              </Button>
              <div id="gap" className="h-6 md:w-6" />
            </>
          ) : (
            <>
              <Button className="bg-black hover:bg-black px-6 " onClick={() => setSelectBTNBool(!SelectBTNBool)}>
                Cancel
              </Button>
              <div id="gap" className="h-6 md:w-6" />
              <Button
                className="bg-black hover:bg-black px-6"
                onClick={() => {
                  // doDeleteMultiple();
                }}
              >
                Delete
              </Button>
            </>
          )}
          {SelectBTNBool && (
            <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/project/part-diagnose/add')}>
              Add New Part Diagnose
            </Button>
          )}
        </div>
      </div>
      {dataVendor.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                {!SelectBTNBool && (
                  <th className="w-8">
                    <Tooltip label="Select All">
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onChange={(e) => {
                          const currentPageIds = dataVendor.map((x: any) => x.ID);
                          if (checkedBTNBool) {
                            setIdspec((prev: any) => prev.filter((id: any) => !currentPageIds.includes(id)));
                            setCheckedBTNBool(!checkedBTNBool);
                          } else {
                            setIdspec((prev: any) => [...prev, ...currentPageIds]);

                            setCheckedBTNBool(!checkedBTNBool);
                          }
                        }}
                        checked={checkedBTNBool}
                      />
                    </Tooltip>
                  </th>
                )}
                <Th
                  sorted={sortBy === 'ProjectName'}
                  onSort={() => Urutkan('ProjectName')}
                  reversed={reverseSortDirection}
                >
                  Project Name
                </Th>
                <Th sorted={sortBy === 'Category'} onSort={() => Urutkan('Category')} reversed={reverseSortDirection}>
                  Category
                </Th>
                <Th sorted={sortBy === 'PartName'} onSort={() => Urutkan('PartName')} reversed={reverseSortDirection}>
                  Part Name
                </Th>
                <Th sorted={sortBy === 'Qty'} onSort={() => Urutkan('Qty')} reversed={reverseSortDirection}>
                  Qty
                </Th>
                <Th sorted={sortBy === 'Condition'} onSort={() => Urutkan('Condition')} reversed={reverseSortDirection}>
                  Condition
                </Th>
                <Th sorted={sortBy === 'Action'} onSort={() => Urutkan('Action')} reversed={reverseSortDirection}>
                  Action
                </Th>
                <Th sorted={sortBy === 'Storage'} onSort={() => Urutkan('Storage')} reversed={reverseSortDirection}>
                  Storage Location
                </Th>
                <Th sorted={sortBy === 'Notes'} onSort={() => Urutkan('Notes')} reversed={reverseSortDirection}>
                  Notes
                </Th>
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

export default PartDiagnosePage;
