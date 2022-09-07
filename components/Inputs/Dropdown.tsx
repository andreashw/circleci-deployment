import { Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';

interface IData {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  data: IData[];
  value?: string;
  onChange?: (val: any) => void;
}

export function Dropdown({ label = 'label', data, value, onChange }: DropdownProps) {
  return (
    <>
      <Select
        label={label}
        placeholder={label}
        rightSection={<IconChevronDown size={14} />}
        value={value}
        data={data}
        onChange={onChange}
      />
    </>
  );
}
