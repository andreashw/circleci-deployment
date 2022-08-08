import { Select } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons'

let years:number[] = []
for (let i=1990; i<=2010; i++) {
    years.push(i);
} 

export function YearRange({
    label = "label"
}) {
    return (
        <>
            <label className='w-[110px] max-width-[35%] text-[14px]'>{label}</label>
            <Select
                placeholder="Select Year"
                rightSection={<IconChevronDown size={14} />}
                data={years.map(y => ({
                    value: y.toString(),
                    label: y.toString()
                }))}
            />
            <span className='px-1'>-</span>
            <Select
                placeholder="Select Year"
                rightSection={<IconChevronDown size={14} />}
                data={years.map(y => ({
                    value: y.toString(),
                    label: y.toString()
                }))}
            />
        </>
    )
}