import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, Grid, Select, Text, Textarea, TextInput, Anchor } from '@mantine/core';
import { useRouter } from 'next/router';
import { DatePicker } from '@mantine/dates';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';
import useSWR from 'swr';
import { Dropdown } from '@components/Inputs/Dropdown';
import { IEngineer } from '@contracts/enginers-interface';
import { IProject } from '@contracts/project-interface';
import { HourRange } from '@components/Inputs/HourRange';
import { IconChevronDown } from '@tabler/icons';
import { useEffect } from 'react';
import dayjs from 'dayjs';

function AddJobReportPage() {
  const router = useRouter();
  const { report } = router.query;
  const { data: dataEngineers } = useSWR<IEngineer[]>('/api/v1/workers/');
  const { data: dataProjects } = useSWR<IProject[]>('/api/v1/projects/');
  const [input, handleInput] = useInput({
    report_date: null,
    engineer: '',
    project: '',
    start_hour: '',
    end_hour: '',
    total_hour: '',
    department: '',
    job: '',
    status_pekerja: '',
    task: '',
  });

  const doSubmit = (e: any) => {
    e.preventDefault();
    // Date di format sesuai requirement Database
    const formatedDate = dayjs(input.report_date).format('YYYY-MM-DD');
    fetcher('/api/v1/jobs/', {
      method: 'POST',
      body: {
        date: formatedDate,
        start_hour: input.start_hour,
        end_hour: input.end_hour,
        worker_id: Number(input.engineer),
        project_id: Number(input.project),
        department_id: Number(input.department),
        status: input.status_pekerja,
        job_description: input.job,
        task: input.task,
      },
    }).then(() => {
      showNotification({
        title: 'Success',
        message: 'Job Report berhasil ditambahkan',
        color: 'teal',
      });
      if (report === 'hourly') {
        router.replace('/jobreport/hourly');
      } else {
        router.replace('/jobreport/daily');
      }
    });
  };

  useEffect(() => {
    if (input.start_hour !== '' && input.end_hour !== '') {
      const start_hour = parseInt(input.start_hour.split(':')[0], 10);
      const end_hour = parseInt(input.end_hour.split(':')[0], 10);

      if (end_hour < start_hour) {
        handleInput('end_hour', true)('');
        handleInput('total_hour', true)('');
        showNotification({
          title: 'Alert',
          message: 'End Hour not valid',
          color: 'red',
        });
      } else {
        handleInput('total_hour', true)(end_hour - start_hour);
      }
    }
  }, [input.start_hour, input.end_hour]);

  return (
    <>
      <HeadingTop
        text="Add Job Reports"
        items={[
          {
            title: 'Job Report',
            href:
              report === 'hourly' ? '/jobreport/hourly' : report === 'daily' ? '/jobreport/daily' : '/jobreport/daily',
          },
          { title: 'Add Job Reports', href: '#' },
        ]}
      />
      <form onSubmit={doSubmit}>
        <div className="mx-5">
          <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
            Details
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6}>
              <DatePicker
                placeholder="Select Date"
                label="Date"
                value={input.report_date}
                onChange={handleInput('report_date', true)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <Dropdown
                label="Engineer"
                data={dataEngineers?.map(({ ID, name }) => ({ value: ID.toString(), label: name })) || []}
                onChange={handleInput('engineer', true)}
              />
            </Grid.Col>
          </Grid>

          <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
            Task
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6} className="flex flex-row items-center">
              <HourRange
                label="Hour"
                valStart={input.start_hour}
                valEnd={input.end_hour}
                onStartChange={handleInput('start_hour', true)}
                onEndChange={handleInput('end_hour', true)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                disabled
                label="Total Hour"
                placeholder="e.g 009348xxxxxx"
                value={`${input.total_hour} MH`}
                onChange={handleInput('total_hour')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <Dropdown
                label="Project"
                data={dataProjects?.map(({ ID, name }) => ({ value: ID.toString(), label: name })) || []}
                onChange={handleInput('project', true)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <Select
                label="Department"
                placeholder="Department"
                rightSection={<IconChevronDown size={14} />}
                value={input.department}
                onChange={handleInput('department', true)}
                data={[
                  { value: '1', label: 'Metalwork' },
                  { value: '2', label: 'Body' },
                  { value: '3', label: 'Mechanical' },
                  { value: '4', label: 'Electrical' },
                  { value: '5', label: 'Upholstery' },
                  { value: '6', label: 'General' },
                  { value: '7', label: 'Blasting' },
                  { value: '8', label: 'Powder Coating' },
                  { value: '9', label: 'Electroplating' },
                ]}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput label="Job" placeholder="e.g Body Repair" value={input.job} onChange={handleInput('job')} />
            </Grid.Col>
            <Grid.Col md={6}>
              <Select
                label="Status Kerja"
                placeholder="Status Kerja"
                rightSection={<IconChevronDown size={14} />}
                value={input.status_pekerja}
                onChange={handleInput('status_pekerja', true)}
                data={[
                  { value: 'Tukang', label: 'Tukang' },
                  { value: 'Kenek', label: 'Kenek' },
                ]}
              />
            </Grid.Col>
            <Grid.Col md={12}>
              <Textarea
                styles={{ input: { height: 'unset !important' } }}
                label="Task"
                placeholder="e.g do some work"
                minRows={4}
                value={input.task}
                onChange={handleInput('task')}
              />
            </Grid.Col>
          </Grid>

          <Grid className="mt-10">
            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Anchor
                component="button"
                className="flex w-full h-14 text-black items-center justify-center"
                onClick={router.back}
              >
                Cancel
              </Anchor>
              {/* <Button className="text-black hover:text-white hover:bg-black w-full h-14" onClick={router.back}>
                Cancel
              </Button> */}
            </Grid.Col>
            <Grid.Col md={2}>
              <Button className="bg-black hover:bg-black w-full h-14" type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default AddJobReportPage;
