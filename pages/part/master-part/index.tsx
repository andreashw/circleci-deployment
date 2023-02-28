import { ScrollArea, Drawer, Text, Table, Menu, Button, Checkbox, Tooltip, Pagination, Select } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { IParts } from '@contracts/parts-interface';
import useInput from '@hooks/useInput';
import { startTransition, useState } from 'react';
import { Th } from '@components/Th';
import { showNotification } from '@mantine/notifications';

function MasterPartPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const [input, handleInput] = useInput({
    search: '',
    sortBy: '',
    start_amound: '',
    end_amound: '',
    selectedId: '',
    start_date: '',
    end_date: '',
    fillter_type: [],
    fillter_project: [],
    page: 1,
    limit: '100',
  });

  const { data: dataParts, mutate } =
    useSWR(`/api/v1/master-part/?sortBy=${input.sortBy}&page=${input.page}&limit=${input.limit}&search=${input.search}
`);
  const [idSpec, setIdspec] = useState<any>([]);
  const [SelectBTNBool, setSelectBTNBool] = useState(true);
  const [checkedBTNBool, setCheckedBTNBool] = useState(false);

  function btnSearch(search: any) {
    startTransition(() => {
      handleInput('search', true)(search);
    });
  }
  const onDeleteData = async (part: IParts) => {
    console.log(part.ID);

    await fetcher(`/api/v1/master-part/${part.ID}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        mutate();
      })
      .catch((err) => {
        showNotification({
          title: 'Error',
          message: err?.data?.error,
          color: 'red',
        });
      });
  };

  const doDeleteMultiple = async () => {
    await fetcher('/api/v1/master-part/mass', {
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

  function deleteProfile(part: any) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{part.Name}</b> Part Data ?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(part),
    });
    console.log('====================================');
    // const response: IParts | undefined = await fetcher('/api/v1/clients/' + id, {
    //   method: 'DELETE',
    // });
  }

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

  const body = () =>
    dataParts?.Data?.map((item: any, index: any) => (
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
        <td className="cursor-pointer" onClick={() => Router.push(`/part/master-part/${item.ID}`)}>
          {item.Name}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/part/master-part/${item.ID}`)}>
          {item.Category}
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
              <Menu.Label>{item.NameInput}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/part/master-part/edit/${item.ID}`)}>
                Edit Part
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete Part
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  const [sortBy, setSortBy] = useState<any>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  function Urutkan(option: string) {
    console.log(option, reverseSortDirection);
    console.log(sortBy === option);
    setSortBy(option);
    if (option === 'PartName') {
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
  }

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Master Parts
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="Master Part" onSubmit={btnSearch} />
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
            <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('./master-part/add')}>
              Add New Master Parts
            </Button>
          )}
        </div>
      </div>
      {dataParts?.Data?.length > 0 ? (
        <ScrollArea>
          <Table draggable="false" striped highlightOnHover>
            <thead>
              <tr>
                {!SelectBTNBool && (
                  <th className="w-8">
                    <Tooltip label="Select All">
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onChange={(e) => {
                          const currentPageIds = dataParts?.Data?.map((x: any) => x.ID);
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
                <Th sorted={sortBy === 'PartName'} onSort={() => Urutkan('PartName')} reversed={reverseSortDirection}>
                  Part Name
                </Th>
                <Th sorted={sortBy === 'Category'} onSort={() => Urutkan('Category')} reversed={reverseSortDirection}>
                  Category
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
          <Text color="#828282" size={14} className="hidden md:flex">
            Show {dataParts?.DataPerPage} from {dataParts?.TotalData} List Parts
          </Text>
        </div>
        <Pagination page={dataParts?.CurrentPage} onChange={setPage} total={dataParts?.TotalPage} />
      </div>
    </>
  );
}

export default MasterPartPage;
