import { useState } from 'react';
import { Table, ScrollArea, Menu, Text, Pagination, Button, Divider } from '@mantine/core';

import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';

import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { fetcher } from '@api/fetcher';
import { IEngine } from '@contracts/engine-interface';

export default function Automobile(/*props*/) {
  const modals = useModals();
  const [activePage, setPage] = useState(1);
  const { data: dataEngines, mutate } = useSWR('/api/v1/engines/');

  const onDeleteData = async (engine: IEngine) => {
    console.log(engine.ID);

    const response: IEngine | undefined = await fetcher(`/api/v1/engines/${engine.ID}`, {
      method: 'DELETE',
    });
    console.log('Response Delete from API ', response);
    if (response) {
      mutate();
    }
  };

  const deleteData = (engine: IEngine) => {
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <Text size="sm" lineClamp={2}>
          Apakah Anda yakin menghapus ini?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Yes', cancel: 'No' },
      confirmProps: { className: 'bg-danger', color: 'red' },
      onConfirm: () => onDeleteData(engine),
    });
  };

  const body = () =>
    dataEngines.map((item: IEngine, index: any) => (
      <tr key={index}>
        <td onClick={() => Router.push(`/engine/${item.ID}`)}>{item.name}</td>
        <td onClick={() => Router.push(`/engine/${item.ID}`)}>{item.EngineManufactures.name}</td>
        <td onClick={() => Router.push(`/engine/${item.ID}`)}>{`${item.year_start} - ${item.year_end}`}</td>
        <td onClick={() => Router.push(`/engine/${item.ID}`)}>{item.EngineLayouts.name}</td>
        <td onClick={() => Router.push(`/engine/${item.ID}`)}>{item.engine_type}</td>
        <td onClick={() => Router.push(`/engine/${item.ID}`)}>{item.fuel_type}</td>
        <td>
          <Menu>
            <Menu.Target>
              {/* <Button variant="white" color={'red'}>Action</Button> */}
              <div className="flex content-center items-center w-6 h-9 cursor-pointer">
                <IconDotsVertical size={14} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{item.name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/engine/edit/${item.ID}`)}>
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
      <div className="px-6 pt-6" style={{ backgroundColor: 'rgba(44, 44, 44, 0.05)' }}>
        <Text align="left" weight="bold" mb="xs" size="xl">
          Engine
        </Text>
        <div className="flex justify-between">
          <SearchForm searchName="Engine" />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/engine/add')}>
            Add New Engine
          </Button>
        </div>
      </div>

      {dataEngines.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Engine Name</th>
                <th>Manufacturer</th>
                <th>Prod. year</th>
                <th>Layout</th>
                <th>Type</th>
                <th>Fuel Type</th>
                <th />
              </tr>
            </thead>
            <tbody>{body()}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Tidak ada data.
        </Text>
      )}

      <div className="flex justify-between my-5 p-6">
        <Text color="#828282" size={14}>
          Show 10 from 1020 automobiles
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div>
    </>
  );
}
