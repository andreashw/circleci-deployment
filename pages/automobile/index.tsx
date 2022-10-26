import { Table, ScrollArea, Menu, Text, Button, Divider } from '@mantine/core';

import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';

import useSWR from 'swr';
import { IAutomobile } from '@contracts/automobile-interface';
import SearchForm from '@components/Forms/Search';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { fetcher } from '@api/fetcher';

export default function Automobile(/*props*/) {
  const modals = useModals();
  const { data: dataAutomobiles, mutate } = useSWR('/api/v1/automobiles/');

  const onDeleteData = async (automobile: IAutomobile) => {
    console.log(automobile.ID);

    const response: IAutomobile | undefined = await fetcher(`/api/v1/automobiles/${automobile.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      // Router.reload();
      mutate();
    }
  };

  const deleteData = (automobile: IAutomobile) => {
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          {/* Delete <b>{automobile.AutomobileManufactures.name}</b> Automobile Data ? */}
          Apakah Anda yakin menghapus ini?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(automobile),
    });
  };

  const body = () =>
    dataAutomobiles.map((item: IAutomobile, index: any) => (
      <tr key={index}>
        <td onClick={() => Router.push(`/automobile/${item.ID}`)}>{item.AutomobileManufactures.name}</td>
        <td onClick={() => Router.push(`/automobile/${item.ID}`)}>{item.AutomobileBrands.name}</td>
        <td onClick={() => Router.push(`/automobile/${item.ID}`)}>{item.model}</td>
        <td onClick={() => Router.push(`/automobile/${item.ID}`)}>{item.AutomobileBodyTypes.name}</td>
        <td onClick={() => Router.push(`/automobile/${item.ID}`)}>{item.year_start}</td>
        <td onClick={() => Router.push(`/automobile/${item.ID}`)}>{item.power_type}</td>
        <td>
          <Menu>
            <Menu.Target>
              {/* <Button variant="white" color={'red'}>Action</Button> */}
              <div className="flex content-center items-center w-6 h-9 cursor-pointer">
                <IconDotsVertical size={14} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{item.AutomobileManufactures.name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/automobile/edit/${item.ID}`)}>
                Edit
              </Menu.Item>
              <Divider />
              <Menu.Item icon={<Trash2 />} onClick={() => deleteData(item)} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  return (
    <>
      <div className="px-6 pt-6">
        <Text align="left" weight="bold" mb="xs" size="xl">
          Automobile
        </Text>
        <div className="flex justify-between">
          <SearchForm searchName="Automobile" />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/automobile/add')}>
            Add New Automobile
          </Button>
        </div>
      </div>

      {dataAutomobiles.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Body Type</th>
                <th>Prod. Year</th>
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
          Show 10 from 1020 automobiles
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div> */}
    </>
  );
}
