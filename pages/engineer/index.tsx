import { useState } from 'react';
import { Table, ScrollArea, Menu, Text, Pagination, Button, Divider } from '@mantine/core';

import { Edit2, Trash2 } from 'react-feather';
import { IconDotsVertical } from '@tabler/icons';
import dayjs from 'dayjs';
import useSWR from 'swr';
import SearchForm from '@components/Forms/Search';
import Router from 'next/router';
import { useModals } from '@mantine/modals';
import { fetcher } from '@api/fetcher';
import { IEngineer } from '@contracts/enginers-interface';
import { rp } from '@support/formatter';
import { showNotification } from '@mantine/notifications';

export default function Engineer(/*props*/) {
  const modals = useModals();
  const [activePage, setPage] = useState(1);
  const { data: dataEngineers, mutate } = useSWR('/api/v1/workers/');

  const onDeleteData = (engineer: IEngineer) => {
    fetcher<IEngineer>(`/api/v1/workers/${engineer.ID}`, {
      method: 'DELETE',
    }).then(() => {
      showNotification({
        title: 'Success',
        message: 'Engineer berhasil dihapus',
        color: 'teal',
      });
      mutate();
    });
  };

  const deleteData = (engineer: IEngineer) => {
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
      onConfirm: () => onDeleteData(engineer),
    });
  };

  const openDetail = (id: number) => () => Router.push(`/engineer/${id}`);
  const body = () =>
    dataEngineers.map((item: IEngineer, index: any) => (
      <tr key={index}>
        <td onClick={openDetail(item.ID)}>{item.name}</td>
        <td onClick={openDetail(item.ID)}>{item.phone}</td>
        <td onClick={openDetail(item.ID)}>{item.bank_name}</td>
        <td onClick={openDetail(item.ID)}>{rp(item.hourly_pay)}</td>
        <td onClick={openDetail(item.ID)}>{rp(item.monthly_pay)}</td>
        <td onClick={openDetail(item.ID)}>{dayjs(item.first_work_date).format('ddd, DD MMM YYYY')}</td>
        <td>
          <Menu>
            <Menu.Target>
              <div className="flex content-center items-center w-6 h-9 cursor-pointer">
                <IconDotsVertical size={14} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{item.name}</Menu.Label>
              <Menu.Item icon={<Edit2 />} onClick={() => Router.push(`/engineer/edit/${item.ID}`)}>
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
          Engineer
        </Text>
        <div className="flex justify-between">
          <SearchForm searchName="Engineer" />
          <Button className="bg-black hover:bg-black px-6" onClick={() => Router.push('/engineer/add')}>
            Add New Engineer
          </Button>
        </div>
      </div>

      {dataEngineers.length > 0 ? (
        <ScrollArea>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Bank</th>
                <th>Hourly Pay</th>
                <th>Bulanan Equiv</th>
                <th colSpan={2}>Tanggal Masuk</th>
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
          Show {dataEngineers.length} from {dataEngineers.length} engineers
        </Text>
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div>
    </>
  );
}
