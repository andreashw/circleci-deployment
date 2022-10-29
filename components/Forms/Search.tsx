import { useState } from 'react';
import { Group, TextInput, Loader, Anchor } from '@mantine/core';
// import { X } from 'react-feather';
import { IconFilter } from '@tabler/icons';

export default function SearchForm(props: any) {
  const [search, setSearch] = useState('');

  const submitForm = () => {
    props.onSubmit(search);
  };

  // const cancelSearch = () => {
  //   setSearch('');
  //   props.onCancel();
  // };

  return (
    <Group mb={20} className="w-full">
      <TextInput
        className="max-w-sm"
        placeholder={`Search ${props.searchName ? props.searchName : ''}`}
        rightSection={props.loading && <Loader size="xs" />}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Anchor
        component="button"
        className="flex text-sm text-black items-end justify-center flex-row"
        onClick={submitForm}
      >
        <div className="flex bg-red mx-5">
          <IconFilter />
          Filter
        </div>
      </Anchor>
      {/* <Button onClick={cancelSearch} className="bg-gray-500 hover:bg-gray-500">
        <X />
      </Button> */}
    </Group>
  );
}
