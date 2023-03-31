/* eslint-disable @typescript-eslint/no-shadow */
import { ScrollArea, Drawer, Text, Table, Menu, Button, Select, Pagination, Tooltip, Checkbox } from '@mantine/core';
import { startTransition, useState } from 'react';
import { IconDotsVertical } from '@tabler/icons';
import useSWR from 'swr';
import { fetcher } from '@api/fetcher';
import SearchForm from '@components/Forms/Search';
import { Edit2, Trash2 } from 'react-feather';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { IParts } from '@contracts/parts-interface';
import useInput from '@hooks/useInput';
import { Th } from '@components/Th';
import ModalFilterPart from '@components/modal/FilterPart';
import { showNotification } from '@mantine/notifications';

function ListPartPage() {
  const modals = useModals();
  const [drawerOpened, toggleDrawer] = useState(false);

  const [input, handleInput] = useInput({
    search: '',
    sortBy: '',
    start_amound: '',
    end_amound: '',
    selectedId: '',
    manufacturedFor: '',
    material: [],
    category: [],
    brand: '',
    page: 1,
    limit: '100',
  });

  const { data: dataParts, mutate } = useSWR(
    `/api/v1/item-part/?sortBy=${input.sortBy}&search=${input.search}&page=${input.page}&limit=${
      input.limit
    }&category=${input.category.flat()}&brand=${input.brand}&material=${input.material.flat()}&manufacturedFor=${
      input.manufacturedFor
    }`
  );

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

    await fetcher(`/api/v1/item-part/${part.ID}`, {
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

  function deleteProfile(part: any) {
    console.log('====================================');
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Delete <b>{part.Brand}</b> Part Data ?
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

  const body = () =>
    dataParts.Data.map((item: any, index: any) => (
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
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/part/list-part/${item.ID}`)}>
          {item.MasterPart.Name}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/part/list-part/${item.ID}`)}>
          {item.MasterPart.Category}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/part/list-part/${item.ID}`)}>
          {item.Brand}
        </td>
        <td className="cursor-pointer w-2/12" onClick={() => Router.push(`/part/list-part/${item.ID}`)}>
          {item.Material}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/part/list-part/${item.ID}`)}>
          {item.ManufacturedFor.map((item: any) => (
            <div>{`${item.AutomobileBrands.Name} ${item.Model} ${item.YearStart} - ${item.YearEnd}`}</div>
          ))}
        </td>
        <td className="cursor-pointer " onClick={() => Router.push(`/part/list-part/${item.ID}`)}>
          {item.Number}
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
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/part/list-part/edit/${item.ID}`)}>
                Edit
              </Menu.Item>
              {/* <Menu.Item icon={<Send />} onClick={() => sendMessage(automobile)}>
              Send Message
            </Menu.Item>
            <Divider />
            <Menu.Item icon={<Save />} onClick={() => copyProfile(automobile)}>
              Copy
            </Menu.Item> */}
              <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile(item)} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  const doDeleteMultiple = async () => {
    await fetcher('/api/v1/item-part/mass', {
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

    if (option === 'Brand') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('brand asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('brand desc');
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
    if (option === 'Material') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('material asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('material desc');
        });
      }
    }
    if (option === 'Number') {
      if (reverseSortDirection === true) {
        console.log(option, 'asc3');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('number asc');
        });
      } else {
        console.log(option, 'dsc4');
        setReverseSortDirection((old) => !old);
        startTransition(() => {
          handleInput('sortBy', true)('number desc');
        });
      }
    }
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

  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer opened={drawerOpened} onClose={() => toggleDrawer(false)} title="Modify user" padding="xl" size="xl">
        {/* <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} /> */}
      </Drawer>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          List Parts
        </Text>
        <div className="flex flex-col sm:flex-row pb-4 sm:pb-0">
          <SearchForm searchName="List Part" onSubmit={btnSearch} />
          <ModalFilterPart
            opened={opened}
            setOpened={setOpened}
            input={input}
            handleInput={handleInput}
            title="Filter List Part"
          />{' '}
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
            <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('./list-part/add')}>
              Add New Entry
            </Button>
          )}
        </div>
        <div className="w-full md:w-[386px] flex-row flex h-20">
          <Button className="bg-black hover:bg-black w-full md:w-1/2 px-6" onClick={() => setOpened(true)}>
            Filter
          </Button>
        </div>
      </div>
      {dataParts.Data?.length > 0 ? (
        <ScrollArea>
          <Table draggable="false" striped highlightOnHover>
            <thead>
              <tr>
                {' '}
                {!SelectBTNBool && (
                  <th className="w-8">
                    <Tooltip label="Select All">
                      <Checkbox
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        onChange={(e) => {
                          const currentPageIds = dataParts?.Data.map((x: any) => x.ID);
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
                <Th sorted={sortBy === 'Brand'} onSort={() => Urutkan('Brand')} reversed={reverseSortDirection}>
                  Brand
                </Th>
                <Th sorted={sortBy === 'Material'} onSort={() => Urutkan('Material')} reversed={reverseSortDirection}>
                  Part Material
                </Th>
                <th>Manufactured For</th>
                <Th sorted={sortBy === 'Number'} onSort={() => Urutkan('Number')} reversed={reverseSortDirection}>
                  Part Number
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

export default ListPartPage;
