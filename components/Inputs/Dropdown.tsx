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

const RightSection = () => (
  <div className="flex bg-inactive h-full rounded-r-md px-4">
    <IconChevronDown className="self-center" size={14} />
  </div>
);
export function Dropdown({ label = 'label', data, value, onChange, placeholder }: DropdownProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder || label}
      rightSection={<RightSection />}
      value={value}
      data={data}
      onChange={onChange}
    />
  );
}
