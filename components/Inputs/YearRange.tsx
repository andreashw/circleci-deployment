import { Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';

const years: number[] = [];
for (let i = 1900; i <= 1987; i++) {
  years.push(i);
}
interface YearRangProps {
  label: string;
  valStart?: string;
  valEnd?: string;
  onStartChange?: (val: any) => void;
  onEndChange?: (val: any) => void;
}

const RightSection = () => (
  <div className="flex bg-inactive h-full rounded-r-md px-4">
    <IconChevronDown className="self-center" size={14} />
  </div>
);

export function YearRange({ label = 'label', onStartChange, onEndChange, valStart = '', valEnd = '' }: YearRangProps) {
  return (
    <>
      <div className="w-28 max-width-[45%] text-[14px]">{label}</div>
      <Select
        placeholder="Select Year"
        rightSection={<RightSection />}
        data={years.map((y) => ({
          value: y.toString(),
          label: y.toString(),
        }))}
        value={valStart.toString()}
        onChange={onStartChange}
      />
      <span className="px-4">-</span>
      <Select
        placeholder="Select Year"
        rightSection={<RightSection />}
        data={years.map((y) => ({
          value: y.toString(),
          label: y.toString(),
        }))}
        value={valEnd.toString()}
        onChange={onEndChange}
      />
    </>
  );
}
