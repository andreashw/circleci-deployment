/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, TextInput, Button, Checkbox } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import useSWR from 'swr';
import { startTransition, useState } from 'react';

function Label({ label = '' }) {
  return (
    <div>
      <p className="font-bold text-[14px] pb-[12px]">{label}</p>
      <hr />
    </div>
  );
}
interface FilterProps {
  input: any;
  handleInput: any;
  opened: boolean;
  title: string;
  handleClosed(): void;
}
function ModalFilterPart({ opened, handleClosed, title, input, handleInput }: FilterProps) {
  const [idSpec, setIdspec] = useState<any>([]);
  const { data: material } = useSWR<any[]>('/api/v1/item-part/part-materials');
  const { data: category } = useSWR<any[]>('/api/v1/item-part/part-categories');
  const { data: automobile } = useSWR<any[]>('/api/v1/automobiles/');
  console.log(idSpec);

  const addCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, '');

  return (
    <Modal opened={opened} onClose={handleClosed} title={title}>
      {/* Modal content */}

      <Label label="Brand" />
      <div className="pt-[12px] pb-4">
        <div>
          <TextInput
            placeholder="Brand"
            value={addCommas(input.brand)}
            onChange={(val) =>
              startTransition(() => {
                handleInput('brand', true)(val.target.value);
              })
            }
          />
        </div>
      </div>
      <Label label="By Category" />
      <div className="pt-[12px] pb-4">
        <div>
          {category?.map((item, i) => (
            <Checkbox
              key={i}
              className="pb-2"
              onChange={(e) => {
                if (input.category.includes(item?.Value)) {
                  startTransition(() => {
                    handleInput('category', true)(input.category?.filter((id: any) => id !== item?.Value));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Value));
                } else {
                  startTransition(() => {
                    handleInput('category', true)([...input.category, item.Value]);
                  });
                  // setIdspec([...idSpec, item.Value]);
                }
              }}
              checked={input.category.includes(item.Value)}
              label={item?.Value}
            />
          ))}
        </div>
      </div>
      <Label label="By Material" />
      <div className="pt-[12px] pb-4">
        <div>
          {material?.map((item, i) => (
            <Checkbox
              key={i}
              className="pb-2"
              onChange={(e) => {
                if (input.material.includes(item?.Value)) {
                  startTransition(() => {
                    handleInput('material', true)(input.material?.filter((id: any) => id !== item?.Value));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Value));
                } else {
                  startTransition(() => {
                    handleInput('material', true)([...input.material, item.Value]);
                  });
                  // setIdspec([...idSpec, item.Value]);
                }
              }}
              checked={input.material.includes(item.Value)}
              label={item?.Value}
            />
          ))}
        </div>
      </div>
      <Label label="By Automobile" />
      <div className="pt-[12px] pb-4">
        <div>
          {automobile?.map((item, i) => (
            <Checkbox
              key={i}
              className="pb-2"
              onChange={(e) => {
                if (input.manufacturedFor.includes(item?.ID)) {
                  startTransition(() => {
                    handleInput('manufacturedFor', true)(input.manufacturedFor?.filter((id: any) => id !== item?.ID));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.ID));
                } else {
                  startTransition(() => {
                    handleInput('manufacturedFor', true)([...input.manufacturedFor, item.ID]);
                  });
                  // setIdspec([...idSpec, item.ID]);
                }
              }}
              checked={input.manufacturedFor.includes(item.ID)}
              label={`${item?.AutomobileBrands.Name}`}
            />
          ))}
        </div>
      </div>

      <Button className="bg-black hover:bg-black px-6" onClick={handleClosed}>
        Apply
      </Button>
      <Button
        className="bg-white hover:bg-white text-black px-6"
        onClick={() =>
          startTransition(() => {
            handleInput('material', true)([]);
            handleInput('category', true)([]);
            handleInput('start_date', true)('');
            handleInput('end_date', true)('');
            handleInput('search', true)('');
            handleInput('start_amound', true)('');
            handleInput('end_amound', true)('');
          })
        }
      >
        Reset
      </Button>
    </Modal>
  );
}

export default ModalFilterPart;
