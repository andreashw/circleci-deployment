import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Button, Grid, Text, Textarea, TextInput, Anchor, Select } from '@mantine/core';
import { useRouter } from 'next/router';
import { DatePicker } from '@mantine/dates';
import { fetcher } from '@api/fetcher';
import { showNotification } from '@mantine/notifications';
import useSWR from 'swr';
import { Dropdown } from '@components/Inputs/Dropdown';
import { IReportHourly } from '@contracts/report-hourly-interface';
import { IEngineer } from '@contracts/enginers-interface';
import { IProject } from '@contracts/project-interface';
import { V2HourRange } from '@components/Inputs/HourRange';
import { IconChevronDown } from '@tabler/icons';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { IDepartment } from '@contracts/department-interface';

function EditHourly() {
  const router = useRouter();
  const { id } = router.query;
  const { data: dataEngineers } = useSWR<IEngineer[]>('/api/v1/workers/');
  const { data: dataProjects } = useSWR<IProject[]>('/api/v1/projects/');
  const { data: dataDepartments } = useSWR<IDepartment[]>('/api/v1/department/');
  const { data: hourly, mutate } = useSWR<IReportHourly>(`/api/v1/jobs/${id}`);
  const [input, handleInput] = useInput({
    report_date: dayjs(hourly?.date).toDate(),
    engineer: hourly?.worker_id,
    start_hour: Date.parse(`${dayjs(Date.now()).format('MM-DD-YYYY')} ${hourly?.start_hour}`) / 1000,
    end_hour: Date.parse(`${dayjs(Date.now()).format('MM-DD-YYYY')} ${hourly?.end_hour}`) / 1000,
    project: hourly?.project_id,
    department: hourly?.department_id,
    job: hourly?.job_description,
    status_pekerja: hourly?.status,
    task: hourly?.task,
    total_hour: '',
  });

  const doSubmit = (e: any) => {
    e.preventDefault();
    // Date di format sesuai requirement Database
    const formatedDate = dayjs(input.report_date).format('YYYY-MM-DD');
    fetcher(`/api/v1/jobs/${id}`, {
      method: 'PATCH',
      body: {
        date: formatedDate,
        start_hour: dayjs(new Date(input.start_hour * 1000)).format('HH:mm'),
        end_hour: dayjs(new Date(input.end_hour * 1000)).format('HH:mm'),
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
        message: 'Report Hourly berhasil diedit',
        color: 'teal',
      });
      mutate();
      router.replace('/jobreport/hourly');
    });
  };

  useEffect(() => {
    if (input.start_hour !== '' && input.end_hour !== '') {
      const start_hour = Math.floor(input.start_hour);
      const end_hour = Math.floor(input.end_hour);
      const total_hour = end_hour - start_hour;
      const hour = total_hour / 3600;
      const menit = (total_hour % 3600) / 60;

      console.log('====================================');
      console.log(start_hour, end_hour);
      console.log('====================================');

      if (total_hour < 0) {
        handleInput('total_hour', true)('');
      } else {
        handleInput('total_hour', true)(`${Math.floor(hour)}.${Math.floor(menit)}`);
      }
    }
  }, [input.start_hour, input.end_hour]);
  console.log('====================================');
  console.log(input.start_hour);
  console.log(dayjs(hourly?.start_hour).toDate());
  console.log(new Date().getTime() / 1000, dayjs(hourly?.date).format('DD-MM-YYYY'), hourly?.start_hour);
  console.log('====================================');
  console.log(Date.parse(`${dayjs(Date.now()).format('DD-MM-YYYY')} ${hourly?.start_hour}`) / 1000, 'ini ya');
  console.log('====================================');
  console.log(new Date(`${hourly?.date} ${hourly?.start_hour}`), dayjs(Date.now()).format('DD-MM-YYYY'));
  console.log('====================================');
  return (
    <>
      <HeadingTop
        text="Edit Report Hourly"
        items={[
          { title: 'Job Report Hourly', href: '/jobreport/hourly' },
          { title: 'Edit Report Hourly', href: '#' },
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
                value={input.engineer?.toString()}
                data={dataEngineers?.map(({ ID, name }) => ({ value: ID.toString(), label: name })) || []}
                onChange={handleInput('engineer', true)}
              />
            </Grid.Col>
          </Grid>

          <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
            Job
          </Text>
          <Grid gutter="xl">
            <Grid.Col md={6} className="flex flex-row items-center">
              <V2HourRange
                label="Hour"
                valueStart={input.start_hour !== '' ? new Date(input.start_hour * 1000) : null}
                valueEnd={input.end_hour !== '' ? new Date(input.end_hour * 1000) : null}
                onStartChange={(val) => handleInput('start_hour', true)(val / 1000)}
                onEndChange={(val) => handleInput('end_hour', true)(val / 1000)}
                error={input.end_hour < input.start_hour}
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
                value={input.project?.toString()}
                data={dataProjects?.map(({ ID, name }) => ({ value: ID.toString(), label: name })) || []}
                onChange={handleInput('project', true)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <Dropdown
                label="Department"
                value={input.department.toString()}
                data={dataDepartments?.map(({ ID, name }) => ({ value: ID.toString(), label: name })) || []}
                onChange={handleInput('department', true)}
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
                value={input.status_pekerja?.toString()}
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
                label="Description"
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

export default EditHourly;
