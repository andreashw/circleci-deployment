import { Select } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconChevronDown } from '@tabler/icons';

const hours: string[] = [];
for (let i = 0; i < 24; i++) {
  hours.push(`${(i < 10 ? '0' : '') + i}:00`);
}

interface YearRangProps {
  label: string;
  valStart?: string;
  valEnd?: string;
  onStartChange?: (val: any) => void;
  onEndChange?: (val: any) => void;
}
interface hourRangProps {
  label: string;
  valueStart?: any;
  valueEnd?: any;
  onStartChange?: (val: any) => void;
  onEndChange?: (val: any) => void;
  error?: boolean;
}

const RightSection = () => (
  <div className="flex bg-inactive h-full rounded-r-md px-4">
    <IconChevronDown className="self-center" size={14} />
  </div>
);

export function HourRange({ label = 'label', onStartChange, onEndChange, valStart = '', valEnd = '' }: YearRangProps) {
  return (
    <>
      <div className="w-28 max-width-[45%] text-[14px]">{label}</div>
      <Select
        placeholder="Select Hour"
        rightSection={<RightSection />}
        data={hours.map((y) => ({
          value: y,
          label: y,
        }))}
        value={valStart}
        onChange={onStartChange}
      />
      <span className="px-4">-</span>
      <Select
        placeholder="Select Hour"
        rightSection={<RightSection />}
        data={hours.map((y) => ({
          value: y,
          label: y,
        }))}
        value={valEnd}
        onChange={onEndChange}
      />
    </>
  );
}

export function V2HourRange({
  label = 'label',
  onStartChange,
  onEndChange,
  valueStart,
  valueEnd,
  error,
}: hourRangProps) {
  return (
    <>
      <div className="w-28 max-width-[45%] text-[14px]">{label}</div>
      <TimeInput value={valueStart} onChange={onStartChange} />
      <span className="px-4">-</span>
      <TimeInput style={{ border: `${error ? '1px solid red' : ''}` }} value={valueEnd} onChange={onEndChange} />
    </>
  );
}
