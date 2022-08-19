import { useState } from 'react';
import { Group, TextInput, Button, Loader } from '@mantine/core';
import { X } from 'react-feather';
import { IconFilter } from '@tabler/icons';

export default function SearchForm(props: any) {
  const [search, setSearch] = useState('');

  const submitForm = () => {
    props.onSubmit(search);
  };

  const cancelSearch = () => {
    setSearch('');
    props.onCancel();
  };

  return (
    <Group mb={20}>
      <TextInput
        placeholder="Search Automobile"
        style={{ minWidth: 395, flexGrow: 0 }}
        rightSection={props.loading && <Loader size="xs" />}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Button rightIcon={<IconFilter />} variant="white" color="black" onClick={submitForm}>
        Filter
      </Button>
      <Button onClick={cancelSearch} className="bg-gray-500 hover:bg-gray-500">
        <X />
      </Button>
    </Group>
  );
}
