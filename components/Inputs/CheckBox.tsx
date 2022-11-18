import { Checkbox, Text } from '@mantine/core';
import { useState } from 'react';

interface CheckboxProps {
  disabled?: boolean;
}

export default function CheckboxList({ disabled = false }: CheckboxProps) {
  const Menu1 = ['All', 'Add', 'Edit', 'Delete', 'View'];

  const [idSpec, setIdspec] = useState<any>(['All', 'Add', 'Edit', 'Delete', 'View']);

  return (
    <div>
      <div>
        <Text className="mt-[1rem] mb-[1rem] text-[16px]" weight={700}>
          Automobile
        </Text>
      </div>
      <div className="flex flex-row justify-between">
        {Menu1.map((data) => (
          <Checkbox
            onChange={() => {
              if (idSpec.includes(data)) {
                console.log('aktive');
                if (data === 'All') {
                  setIdspec([]);
                } else if (idSpec.length <= Menu1.length) {
                  console.log(
                    'jalan',
                    idSpec.filter((id: string) => id !== 'All' && id !== data)
                  );

                  setIdspec(idSpec.filter((id: string) => id !== 'All' && id !== data));
                } else {
                  setIdspec(idSpec.filter((id: string) => id !== data));
                }
              } else {
                console.log('tidak aktive', data);
                if (data === 'All') {
                  setIdspec(Menu1);
                } else if (idSpec.length === Menu1.length - 2) {
                  console.log('cek bro');

                  setIdspec([...idSpec, data, 'All']);
                } else {
                  console.log('ce', idSpec.length, ' ===', Menu1.length - 2);

                  setIdspec([...idSpec, data]);
                }
              }
            }}
            checked={idSpec.includes(data)}
            className="pl-2"
            disabled={disabled}
            label={data}
            color="gray"
          />
        ))}
      </div>
    </div>
  );
}
