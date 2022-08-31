import { Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';

const years: number[] = [];
for (let i = 1990; i <= 2010; i++) {
  years.push(i);
}

export function YearRange({ label = 'label' }) {
  return (
    <>
      <div className="w-28 max-width-[45%] text-[14px]">{label}</div>
      <Select
        placeholder="Select Year"
        rightSection={<IconChevronDown size={14} />}
        data={years.map((y) => ({
          value: y.toString(),
          label: y.toString(),
        }))}
      />
      <span className="px-4">-</span>
      <Select
        placeholder="Select Year"
        rightSection={<IconChevronDown size={14} />}
        data={years.map((y) => ({
          value: y.toString(),
          label: y.toString(),
        }))}
      />
    </>
  );
}