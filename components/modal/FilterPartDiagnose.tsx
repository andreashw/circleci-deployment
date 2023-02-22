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
function ModalFilterPartDiagnose({ opened, setOpened, title, input, handleInput }: FilterProps) {
  const action = [
    { label: 'Use', value: 'use' },
    { label: 'Restore', value: 'restore' },
    { label: 'Purchase', value: 'purchase' },
  ];
  const condition = [
    { label: 'Good', Value: 'good' },
    { label: 'Bad', Value: 'bad' },
  ];
  const { data: category } = useSWR<any[]>('/api/v1/item-part/part-categories');
  const { data: automobile } = useSWR<any[]>('/api/v1/projects/');

  const [inputKebalik, handleInputKebalik] = useInput({
    search: '',
    sortBy: '',
    category: '',
    automobile: '',
    action: '',
    condition: '',
    page: 1,
  });

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title={title}>
      {/* Modal content */}

      <Label label="By Project" />
      <div className="pt-[12px] pb-4">
        <div>
          {automobile?.map((item, i) => (
            <Checkbox
              key={i}
              className="pb-2"
              onChange={(e) => {
                if (inputKebalik.automobile.includes(item?.Name)) {
                  startTransition(() => {
                    handleInputKebalik(
                      'automobile',
                      true
                    )(inputKebalik.automobile?.filter((id: any) => id !== item?.Name));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Name));
                } else {
                  startTransition(() => {
                    handleInputKebalik('automobile', true)([...inputKebalik.automobile, item.Name]);
                  });
                  // setIdspec([...idSpec, item.Name]);
                }
              }}
              checked={inputKebalik.automobile.includes(item.Name)}
              label={item?.Name}
            />
          ))}
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
      <Label label="By Action" />
      <div className="pt-[12px] pb-4">
        <div>
          {action?.map((item, i) => (
            <Checkbox
              key={i}
              className="pb-2"
              onChange={(e) => {
                if (inputKebalik.action.includes(item?.value)) {
                  startTransition(() => {
                    handleInputKebalik('action', true)(inputKebalik.action?.filter((id: any) => id !== item?.value));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Value));
                } else {
                  startTransition(() => {
                    handleInputKebalik('action', true)([...inputKebalik.action, item.value]);
                  });
                  // setIdspec([...idSpec, item.Value]);
                }
              }}
              checked={inputKebalik.action.includes(item.value)}
              label={item?.value}
            />
          ))}
        </div>
      </div>
      <Label label="By Condition" />
      <div className="pt-[12px] pb-4">
        <div>
          {condition?.map((item, i) => (
            <Checkbox
              key={i}
              className="pb-2"
              onChange={(e) => {
                if (inputKebalik.condition.includes(item?.Value)) {
                  startTransition(() => {
                    handleInputKebalik(
                      'condition',
                      true
                    )(inputKebalik.condition?.filter((id: any) => id !== item?.Value));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Value));
                } else {
                  startTransition(() => {
                    handleInputKebalik('condition', true)([...inputKebalik.condition, item.Value]);
                  });
                  // setIdspec([...idSpec, item.Value]);
                }
              }}
              checked={inputKebalik.condition.includes(item.Value)}
              label={`${item?.Value}`}
            />
          ))}
        </div>
      </div>

      <Button
        className="bg-white hover:bg-white text-black px-6"
        onClick={() =>
          startTransition(() => {
            handleInput('action', true)('');
            handleInput('category', true)('');
            handleInput('condition', true)('');
            handleInput('automobile', true)('');
            handleInput('search', true)('');
            handleInput('sortBy', true)('');
            handleInputKebalik('action', true)('');
            handleInputKebalik('category', true)('');
            handleInputKebalik('condition', true)('');
            handleInputKebalik('automobile', true)('');
            handleInputKebalik('search', true)('');
            handleInputKebalik('sortBy', true)('');
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
            handleInput('action', true)(inputKebalik.action);
            handleInput('category', true)(inputKebalik.category);
            handleInput('condition', true)(inputKebalik.condition);
            handleInput('automobile', true)(inputKebalik.automobile);
            handleInput('search', true)(inputKebalik.search);
            setOpened(false);
          })
        }
      >
        Apply
      </Button>
    </Modal>
  );
}

export default ModalFilterPartDiagnose;
