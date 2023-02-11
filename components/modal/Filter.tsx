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
function ModalFilter({ opened, handleClosed, title, input, handleInput }: FilterProps) {
  const [idSpec, setIdspec] = useState<any>([]);
  const { data: type } = useSWR<any[]>('/api/v1/expense/list-types');
  const { data: project } = useSWR<any[]>('/api/v1/projects/');
  console.log(idSpec);

  const addCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, '');

  return (
    <Modal opened={opened} onClose={handleClosed} title={title}>
      {/* Modal content */}
      <Label label="By Date" />
      <div className="flex flex-row items-center pt-[12px] pb-4">
        <DatePicker
          placeholder="Start Date"
          inputFormat="DD MMMM YYYY"
          value={input.start_date}
          onChange={(val) =>
            startTransition(() => {
              handleInput('start_date', true)(val);
            })
          }
        />
        <span className="px-2 md:px-4">-</span>
        <DatePicker
          placeholder="End Date"
          inputFormat="DD MMMM YYYY"
          value={input.end_date}
          onChange={(val) =>
            startTransition(() => {
              handleInput('end_date', true)(val);
            })
          }
        />
      </div>
      <Label label="By Amount" />
      <div className="flex flex-row items-center pt-[12px] pb-4">
        <TextInput
          placeholder="start amound"
          value={addCommas(input.start_amound)}
          onChange={(val) =>
            startTransition(() => {
              handleInput('start_amound', true)(removeNonNumeric(val.target.value));
            })
          }
        />
        <span className="px-2 md:px-4">-</span>
        <TextInput
          placeholder="end amound"
          value={addCommas(input.end_amound)}
          onChange={(val) =>
            startTransition(() => {
              handleInput('end_amound', true)(removeNonNumeric(val.target.value));
            })
          }
        />
      </div>

      <Label label="By Project" />
      <div className="pt-[12px] pb-4">
        {project?.map((item, i) => (
          <Checkbox
            key={i}
            className="pb-2"
            onChange={(e) => {
              if (input?.fillter_project.includes(item?.ID)) {
                startTransition(() => {
                  handleInput('fillter_project', true)(input?.fillter_project.filter((id: any) => id !== item?.ID));
                });
                // setIdspec(idSpec.filter((id: any) => id !== item?.ID));
              } else {
                startTransition(() => {
                  handleInput('fillter_project', true)([...input.fillter_project, item.ID]);
                });
                // setIdspec([...idSpec, item.ID]);
              }
            }}
            checked={input?.fillter_project.includes(item.ID)}
            label={item?.Name}
          />
        ))}
      </div>
      <Label label="By Type" />
      <div className="pt-[12px] pb-4">
        <div>
          {type?.map((item, i) => (
            <Checkbox
              key={i}
              className="pb-2"
              onChange={(e) => {
                if (input.fillter_type.includes(item?.Value)) {
                  startTransition(() => {
                    handleInput('fillter_type', true)(input.fillter_type.filter((id: any) => id !== item?.Value));
                  });
                  // setIdspec(idSpec.filter((id: any) => id !== item?.Value));
                } else {
                  startTransition(() => {
                    handleInput('fillter_type', true)([...input.fillter_type, item.Value]);
                  });
                  // setIdspec([...idSpec, item.Value]);
                }
              }}
              checked={input.fillter_type.includes(item.Value)}
              label={item?.Value}
            />
          ))}
        </div>
      </div>

      <Button className="bg-black hover:bg-black px-6" onClick={handleClosed}>
        Filter
      </Button>
      <Button
        className="bg-white hover:bg-white text-black px-6"
        onClick={() =>
          startTransition(() => {
            handleInput('fillter_type', true)([]);
            handleInput('fillter_project', true)([]);
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

export default ModalFilter;
