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
    <div className="flex-col md:flex-row items-center flex w-full">
      <div className="w-full md:w-[110px]">
        <div className="w-[110px] text-[14px]">{label}</div>
      </div>
      <div className="w-full flex-col md:flex-row flex">
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
        <span className="hidden md:flex p-3">-</span>
        <div className="h-6 md:hidden" />
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
      </div>
    </div>
  );
}
