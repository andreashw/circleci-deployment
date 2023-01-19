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
import { V2HourRange } from '@components/Inputs/HourRange';
import { IconChevronDown } from '@tabler/icons';
import dayjs from 'dayjs';
import Plus from 'icons/Plus';
import Trash from 'icons/Trash';
import { IDepartment } from '@contracts/department-interface';

function AddJobReportPage() {
  const router = useRouter();
  const { report } = router.query;

  const { data: dataEngineers } = useSWR<IEngineer[]>('/api/v1/workers/');
  const { data: dataProjects } = useSWR<IProject[]>('/api/v1/projects/');
  const { data: dataDepartments } = useSWR<IDepartment[]>('/api/v1/department/');
  const [input, handleInput] = useInput({
    report_date: null,
    engineer: '',
    start_hour: '',
    end_hour: '',
    total_hour: '',
    jobs: [
      {
        id: 1,
        project: '',
        start_hour: '',
        end_hour: '',
        total_hour: '',
        department: '',
        job_description: '',
        status_pekerja: '',
        description: '',
      },
    ],
  });

  const doSubmit = async (e: any) => {
    e.preventDefault();

    const formatedDate = dayjs(input.report_date).format('YYYY-MM-DD');
    const group_jobs = input?.jobs?.reduce((prev: any, curr: any) => {
      // eslint-disable-next-line no-param-reassign
      prev = [
        ...prev,
        {
          date: formatedDate,
          worker_id: Number(input.engineer),
          start_hour: dayjs(curr.start_hour).format('HH:mm'),
          end_hour: dayjs(curr.end_hour).format('HH:mm'),
          project_id: Number(curr.project),
          department_id: Number(curr.department),
          status: curr.status_pekerja,
          job_description: curr.job_description,
          task: curr.description,
          // ...curr,
        },
      ];
      return prev;
    }, []);
    // console.log('cektest', group_jobs);

    console.log(input);
    if (input.jobs.findIndex((jobs: any) => jobs.total_hour === '') > -1) {
      showNotification({
        title: 'Alert',
        message: 'End Hour not valid',
        color: 'red',
      });
    } else {
      const response = await fetcher('/api/v1/jobs/bulk', {
        method: 'POST',
        body: group_jobs,
      });
      console.log('Response from API', response);

      if (response) {
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
      }
    }
  };

  const addJobs = () => {
    handleInput(
      'jobs',
      true
    )([
      {
        id: input.jobs.length + 1,
        project: '',
        start_hour: '',
        end_hour: '',
        total_hour: '',
        department: '',
        job_description: '',
        status_pekerja: '',
        description: '',
      },
      ...input.jobs,
    ]);
  };

  const removeVendor = (index: number) => {
    handleInput('jobs', true)(input.jobs.filter((_: any, i: number) => i !== index));
  };

  const handleInputJobs_total_hour = (index: number) => (val: any) => {
    handleInput(
      'jobs',
      true
    )(
      input.jobs.map((x: any) => {
        if (x.id === index) {
          return {
            ...x,
            total_hour: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputJobs_project = (index: number) => (val: any) => {
    handleInput(
      'jobs',
      true
    )(
      input.jobs.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            project: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputJobs_start_hour = (index: number) => (val: any) => {
    handleInput(
      'jobs',
      true
    )(
      input.jobs.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            start_hour: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputJobs_department = (index: number) => (val: any) => {
    handleInput(
      'jobs',
      true
    )(
      input.jobs.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            department: Number(val),
          };
        }
        return x;
      })
    );
  };

  const handleInputJobs_status_pekerja = (index: number) => (val: any) => {
    handleInput(
      'jobs',
      true
    )(
      input.jobs.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            status_pekerja: val,
          };
        }
        return x;
      })
    );
  };

  const handleInputJobs_job = (index: number) => (val: any) => {
    handleInput(
      'jobs',
      true
    )(
      input.jobs.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            job_description: val.target.value,
          };
        }
        return x;
      })
    );
  };

  const handleInputJobs_desc = (index: number) => (val: any) => {
    handleInput(
      'jobs',
      true
    )(
      input.jobs.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            description: val.target.value,
          };
        }
        return x;
      })
    );
  };

  const handleInputJobs_end_hour = (index: number) => (val1?: any) => {
    // const test1 = Math.floor(val1.getTime() / 1000);
    // const test2 = Math.floor(input.jobs[index].start_hour);
    const total_hour = dayjs(val1).diff(input.jobs[index]?.start_hour) / 1000;
    const hour = total_hour / 3600;
    const menit = (total_hour % 3600) / 60;
    if (total_hour > 0) {
      handleInput(
        'jobs',
        true
      )(
        input.jobs.map((x: any, i: number) => {
          if (i === index) {
            return {
              ...x,
              end_hour: val1,
              total_hour: `${Math.floor(hour)}.${Math.floor(menit)}`,
            };
          }
          return x;
        })
      );
    } else {
      handleInput(
        'jobs',
        true
      )(
        input.jobs.map((x: any, i: number) => {
          if (i === index) {
            return {
              ...x,
              end_hour: val1,
              total_hour: '',
            };
          }
          return x;
        })
      );
    }
  };

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
          <div className="sticky top-[70px] bg-white z-10">
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
                  data={dataEngineers?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
                  onChange={handleInput('engineer', true)}
                />
              </Grid.Col>
            </Grid>
          </div>
          {input.jobs.map((jobs: any, ti: number) => (
            <>
              <div key={ti} className="flex flex-row justify-between items-center">
                <Text className="mt-[1rem] mb-[1rem] text-[20px] font-bold" size="lg">
                  Job {input.jobs[ti].id}
                </Text>
                <div className="flex flex-row" style={{}}>
                  {ti === 0 && (
                    <Anchor
                      component="button"
                      className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                      onClick={addJobs}
                    >
                      <div className="flex h-max items-end pb-[3px]">
                        <Plus color="red" width="16" height="16" />
                      </div>
                      <Text className="pl-2">Add Report</Text>
                    </Anchor>
                  )}
                  {ti === 0 && input.jobs.length > 1 && <div className="flex items-center px-3">|</div>}
                  {(input.jobs.length > 1 || ti > 0) && (
                    <Anchor
                      component="button"
                      className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                      onClick={() => removeVendor(ti)}
                    >
                      <div className="flex h-max items-end pb-[3px]">
                        <Trash color="red" width="16" height="16" />
                      </div>
                      <Text className="pl-2">Delete Report</Text>
                    </Anchor>
                  )}
                </div>
              </div>

              <Grid gutter="xl">
                {/* <p>
                  {input.jobs[ti].start_hour !== ''
                    ? dayjs(new Date(input.jobs[ti].start_hour * 1000)).format('HH:mm')
                    : null}
                </p> */}
                <Grid.Col md={6} className="flex flex-row items-center">
                  <V2HourRange
                    label="Hour"
                    valueStart={input.jobs[ti].start_hour !== '' ? input.jobs[ti].start_hour : null}
                    valueEnd={input.jobs[ti].end_hour !== '' ? input.jobs[ti].end_hour : null}
                    onStartChange={(val) => handleInputJobs_start_hour(ti)(val)}
                    onEndChange={(val) => handleInputJobs_end_hour(ti)(val)}
                    error={input.jobs[ti].end_hour < input.jobs[ti].start_hour}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <TextInput
                    disabled
                    label="Total Hour"
                    placeholder="e.g 009348xxxxxx"
                    value={`${input.jobs[ti].total_hour} MH`}
                    onChange={(val) => {
                      handleInputJobs_total_hour(ti)(val);
                    }}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <Dropdown
                    label="Project"
                    data={dataProjects?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
                    value={input.jobs[ti].project}
                    onChange={handleInputJobs_project(ti)}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <Dropdown
                    label="Department"
                    data={dataDepartments?.map(({ ID, Name }) => ({ value: ID.toString(), label: Name })) || []}
                    value={input.jobs[ti].department.toString()}
                    onChange={handleInputJobs_department(ti)}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <TextInput
                    label="Job"
                    placeholder="e.g Body Repair"
                    value={input.jobs[ti].job_description}
                    onChange={(val) => handleInputJobs_job(ti)(val)}
                  />
                </Grid.Col>
                <Grid.Col md={6}>
                  <Select
                    label="Status Kerja"
                    placeholder="Status Kerja"
                    rightSection={<IconChevronDown size={14} />}
                    value={input.jobs[ti].status_pekerja.toString()}
                    onChange={handleInputJobs_status_pekerja(ti)}
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
                    value={input.jobs[ti].description}
                    onChange={handleInputJobs_desc(ti)}
                  />
                </Grid.Col>
              </Grid>
            </>
          ))}

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
