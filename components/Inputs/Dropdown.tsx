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
  placeholder?: string;
}

export function Dropdown({ label = 'label', data, value, onChange, placeholder }: DropdownProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder || label}
      rightSection={<IconChevronDown size={14} />}
      value={value}
      data={data}
      onChange={onChange}
    />
  );
}
