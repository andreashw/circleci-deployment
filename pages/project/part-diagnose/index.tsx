import { ScrollArea, Drawer, Text, Table, Menu, Button, Checkbox, Tooltip, Pagination, Select } from '@mantine/core';
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
import { showNotification } from '@mantine/notifications';
import ModalFilterPartDiagnose from '@components/modal/FilterPartDiagnose';

function PartDiagnosePage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);
  const [input, handleInput] = useInput({
    search: '',
    sortBy: '',
    category: '',
    automobile: '',
    action: '',
    condition: '',
    page: 1,
    limit: '100',
  });
  const { data: dataVendor, mutate } = useSWR(
    `/api/v1/project-part/?page=${input.page}&limit=${input.limit}&sortBy=${input.sortBy}&action=${input.action}&condition=${input.condition}&projectName=${input.automobile}&search=${input.search}&category=${input.category}`
  );

  const { data: automobile } = useSWR<any[]>('/api/v1/projects/');

  const [idSpec, setIdspec] = useState<any>([]);
  const [SelectBTNBool, setSelectBTNBool] = useState(true);
  const [checkedBTNBool, setCheckedBTNBool] = useState(false);

  const onDeleteData = async (project: IProject) => {
    console.log(project.ID);

    const response: IProject | undefined = await fetcher(`/api/v1/project-part/${project.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      showNotification({
        title: 'Success',
        message: 'Delete Success',
        color: 'teal',
      });
      mutate();
    }
  };

  function deleteProfile(project: any) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete{' '}
          <b>
            {project?.Part.MasterPart.Name}- {project?.Part.Brand}
          </b>{' '}
          Project Data ?
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
    dataVendor?.Data.map((item: any, index: any) => (
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
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {automobile?.filter((x) => x.ID === item.ProjectId)?.[0].Name}
          {/* {item.Project.Name} */}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {item.Part.MasterPart.Category}
        </td>
        <td className="cursor-pointer w-2/12 " onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {item.Part.MasterPart.Name}- {item.Part.Brand}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {item.Quantity}
        </td>

        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {item.Condition}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {item.Action}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {item.StorageLocation}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/project/part-diagnose/${item.ID}`)}>
          {item.Note}
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
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/project/part-diagnose/edit/${item.ID}`)}>
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

  function setPage(page: any) {
    startTransition(() => {
      handleInput('page', true)(page);
    });
  }

  function onChangeSelectLimit(limit: any) {
    handleInput('page', true)('1');
    startTransition(() => {
      handleInput('limit', true)(limit);
    });
  }

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
          handleInput('sortBy', true)('Project.name asc');
        });
      } else {
        console.log(option, 'dsc2');
        setReverseSortDirection((old) => !old);

        startTransition(() => {
          handleInput('sortBy', true)('Project.name desc');
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
          handleInput('sortBy', true)('MasterPart.name asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('MasterPart.name desc');
        });
      }
    }
    if (option === 'Qty') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('quantity asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('quantity desc');
        });
      }
    }
    if (option === 'Condition') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('project_parts.condition asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('project_parts.condition desc');
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
          handleInput('sortBy', true)('storage_location asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('storage_location desc');
        });
      }
    }
    if (option === 'Notes') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('note asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('note desc');
        });
      }
    }
  }

  const doDeleteMultiple = async () => {
    await fetcher('/api/v1/project-part/mass', {
      method: 'DELETE',
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      body: { ids: idSpec },
    })
      .then((res: any) => {
        showNotification({
          title: 'Success',
          message: res?.Message,
          color: 'teal',
        });
        setCheckedBTNBool(false);
        setIdspec([]);
        setSelectBTNBool(!SelectBTNBool);
        mutate();
      })
      .catch((err) => {
        showNotification({
          title: 'Error',
          message: err?.Message,
          color: 'red',
        });
      });
  };

  const [opened, setOpened] = useState(false);

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
          <ModalFilterPartDiagnose
            opened={opened}
            setOpened={setOpened}
            input={input}
            handleInput={handleInput}
            title="Filter List Part"
          />
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
                  doDeleteMultiple();
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

        <div className="w-full md:w-[386px] flex-row flex h-20">
          <Button className="bg-black hover:bg-black w-full md:w-1/2 px-6" onClick={() => setOpened(true)}>
            Filter
          </Button>
        </div>
      </div>
      {dataVendor?.Data.length > 0 ? (
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
                          const currentPageIds = dataVendor?.Data.map((x: any) => x.ID);
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
      <div className="flex justify-between my-5 p-6">
        <div className="flex-row flex items-center">
          <div className="w-28 mr-8">
            <Select
              // rightSection={<RightSection />}
              value={input?.limit}
              data={[
                { value: '100', label: '100' },
                { value: '500', label: '500' },
                { value: '1000', label: '1000' },
              ]}
              onChange={onChangeSelectLimit}
            />
          </div>
          <Text color="#828282" size={14}>
            Show {dataVendor?.DataPerPage} from {dataVendor?.TotalData} Project
          </Text>
        </div>
        <Pagination page={dataVendor?.CurrentPage} onChange={setPage} total={dataVendor?.TotalPage} />
      </div>
    </>
  );
}

export default PartDiagnosePage;
