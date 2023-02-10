import { ScrollArea, Drawer, Text, Table, Menu, Button } from '@mantine/core';
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
  });

  const { data: dataParts, mutate } = useSWR(`/api/v1/master-part/?sortBy=${input.sortBy}&search=${input.search}
`);

  function btnSearch(search: any) {
    startTransition(() => {
      handleInput('search', true)(search);
    });
  }
  const onDeleteData = async (part: IParts) => {
    console.log(part.ID);

    const response: IParts | undefined = await fetcher(`/api/v1/master-part/${part.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
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

  const body = () =>
    dataParts.map((item: any, index: any) => (
      <tr key={index}>
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
          handleInput('sortBy', true)('part_name asc');
        });
      } else {
        console.log(option, 'dsc2');
        setReverseSortDirection((old) => !old);

        startTransition(() => {
          handleInput('sortBy', true)('part_name desc');
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
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('./master-part/add')}>
            Add New Master Parts
          </Button>
        </div>
      </div>
      {dataParts.length > 0 ? (
        <ScrollArea>
          <Table draggable="false" striped highlightOnHover>
            <thead>
              <tr>
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
      {/* <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 parts
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div> */}
    </>
  );
}

export default MasterPartPage;
