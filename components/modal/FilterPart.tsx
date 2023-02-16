/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, TextInput, Button, Checkbox } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import useSWR from 'swr';
import { startTransition, useState } from 'react';
import useInput from '@hooks/useInput';

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
  setOpened: any;
}
function ModalFilterPart({ opened, setOpened, title, input, handleInput }: FilterProps) {
  const { data: material } = useSWR<any[]>('/api/v1/item-part/part-materials');
  const { data: category } = useSWR<any[]>('/api/v1/item-part/part-categories');
  const { data: automobile } = useSWR<any[]>('/api/v1/automobiles/');

  const [inputKebalik, handleInputKebalik] = useInput({
    search: '',
    sortBy: '',
    start_amound: '',
    end_amound: '',
    selectedId: '',
    manufacturedFor: '',
    material: [],
    category: [],
    brand: '',
    page: 1,
    limit: '100',
  });

  const addCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, '');

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title={title}>
      {/* Modal content */}

      <Label label="Brand" />
      <div className="pt-[12px] pb-4">
        <div>
          <TextInput
            placeholder="Brand"
            value={addCommas(input.brand)}
            onChange={(val) =>
              startTransition(() => {
                handleInputKebalik('brand', true)(val.target.value);
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
                if (inputKebalik.category.includes(item?.Value)) {
                  startTransition(() => {
                    handleInputKebalik(
                      'category',
                      true
                    )(inputKebalik.category?.filter((id: any) => id !== item?.Value));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Value));
                } else {
                  startTransition(() => {
                    handleInputKebalik('category', true)([...inputKebalik.category, item.Value]);
                  });
                  // setIdspec([...idSpec, item.Value]);
                }
              }}
              checked={inputKebalik.category.includes(item.Value)}
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
                if (inputKebalik.material.includes(item?.Value)) {
                  startTransition(() => {
                    handleInputKebalik(
                      'material',
                      true
                    )(inputKebalik.material?.filter((id: any) => id !== item?.Value));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Value));
                } else {
                  startTransition(() => {
                    handleInputKebalik('material', true)([...inputKebalik.material, item.Value]);
                  });
                  // setIdspec([...idSpec, item.Value]);
                }
              }}
              checked={inputKebalik.material.includes(item.Value)}
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
                if (inputKebalik.manufacturedFor.includes(item?.ID)) {
                  startTransition(() => {
                    handleInputKebalik(
                      'manufacturedFor',
                      true
                    )(inputKebalik.manufacturedFor?.filter((id: any) => id !== item?.ID));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.ID));
                } else {
                  startTransition(() => {
                    handleInputKebalik('manufacturedFor', true)([...inputKebalik.manufacturedFor, item.ID]);
                  });
                  // setIdspec([...idSpec, item.ID]);
                }
              }}
              checked={inputKebalik.manufacturedFor.includes(item.ID)}
              label={`${item?.AutomobileBrands.Name}`}
            />
          ))}
        </div>
      </div>

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
            setOpened(false);
          })
        }
      >
        Reset
      </Button>
      <Button
        className="bg-black hover:bg-black px-6"
        onClick={() =>
          startTransition(() => {
            handleInput('material', true)(inputKebalik.material);
            handleInput('category', true)(inputKebalik.category);
            handleInput('start_date', true)(inputKebalik.start_date);
            handleInput('end_date', true)(inputKebalik.end_date);
            handleInput('search', true)(inputKebalik.search);
            handleInput('start_amound', true)(inputKebalik.start_amound);
            handleInput('end_amound', true)(inputKebalik.end_amound);
            setOpened(false);
          })
        }
      >
        Apply
      </Button>
    </Modal>
  );
}

export default ModalFilterPart;
