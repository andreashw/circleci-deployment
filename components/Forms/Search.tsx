import { useState } from 'react';
import { Group, TextInput, Loader, Anchor } from '@mantine/core';
// import { X } from 'react-feather';
import { IconSearch } from '@tabler/icons';

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
    <Group mb={20} className="w-full flex-row flex ">
      <div className="w-full md:w-[386px] relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <TextInput
            className="max-w-sm"
            placeholder={`Search ${props.searchName ? props.searchName : ''}`}
            rightSection={props.loading && <Loader size="xs" />}
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </form>
        <div className="absolute right-0 top-0 bottom-0 z-10">
          <Anchor
            component="button"
            className="flex text-sm h-[48px]  text-black items-center justify-center flex-row"
            onClick={submitForm}
          >
            <div className="flex bg-red mx-5" hidden={!!props.hidden}>
              <IconSearch />
            </div>
          </Anchor>
        </div>
      </div>
      {/* <Button onClick={cancelSearch} className="bg-gray-500 hover:bg-gray-500">
        <X />
      </Button> */}
    </Group>
  );
}
