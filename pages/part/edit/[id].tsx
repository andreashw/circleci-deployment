import { fetcher } from '@api/fetcher';
import HeadingTop from '@components/TopComponents/Heading';
import useInput from '@hooks/useInput';
import { Anchor, Button, createStyles, Grid, NumberInput, Select, Text, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown } from '@tabler/icons';
import { useRouter } from 'next/router';
import Plus from 'icons/Plus';
import Trash from 'icons/Trash';
import useSWR from 'swr';
import { IParts } from '@contracts/parts-interface';
import { IVendor } from '@contracts/vendor-interface';

const useStyles = createStyles(() => ({
  label: {
    alignItems: 'flex-start',
  },
  cancel: {
    color: 'black',
    height: '56px',
    width: '100%',
  },
  root: {
    width: '100%',
    height: '56px',
  },
}));
function EditPartPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const id = router.query.id as unknown as number;
  const { data: Part } = useSWR<IParts[]>(`/api/v1/parts/${id}`);
  const { data: dataVendor } = useSWR<IVendor[]>('/api/v1/vendors/');

  const [input, handleInput] = useInput({
    name_input: Part ? Part[0]?.name_input : '',
    brand_input: Part ? Part[0]?.brand_input : '',
    category: Part ? Part[0]?.category : '',
    material_input: Part ? Part[0]?.material_input : '',
    req_pcs_input: Part ? Part[0]?.req_pcs_input : '',
    req_unit: Part ? Part[0]?.req_unit : '',
    vendor: Part ? Part[0]?.vendor_id : [],
  });
  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetcher(`/api/v1/parts/${id}`, {
      method: 'PATCH',
      body: {
        name_input: input.name_input,
        brand_input: input.brand_input,
        category: input.category,
        material_input: input.material_input,
        req_pcs_input: Number(input.req_pcs_input),
        req_unit: input.req_unit,
        vendor_id: input.vendor,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      showNotification({
        title: 'Success',
        message: 'Part berhasil diubah',
        color: 'teal',
      });
      router.replace('/part');
    }
  };
  const displacementRight = (
    <Select
      data={[
        { value: 'Pcs', label: 'Pcs' },
        { value: 'Ls', label: 'Ls' },
      ]}
      value={input.req_unit}
      onChange={handleInput('req_unit', true)}
      rightSection={<IconChevronDown size={14} />}
    />
  );
  const addVendor = () => {
    handleInput(
      'vendor',
      true
    )([
      ...input.vendor,
      {
        vendor_id: '',
      },
    ]);
  };
  const removeVendor = (index: number) => {
    handleInput('vendor', true)(input.vendor.filter((_: any, i: number) => i !== index));
  };
  const handleInputVendor = (index: number) => (val: any) => {
    handleInput(
      'vendor',
      true
    )(
      input.vendor.map((x: any, i: number) => {
        if (i === index) {
          return {
            ...x,
            vendor_id: Number(val),
          };
        }
        return x;
      })
    );
  };

  return (
    <>
      <HeadingTop
        text="Add New Part"
        items={[
          { title: 'Parts', href: '/part' },
          { title: 'Add New Part', href: '' },
        ]}
      />

      <form onSubmit={doSubmit}>
        <div className="p-6">
          <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
            Details
          </Text>
          <Grid gutter="xl" className="mb-[48px]">
            <Grid.Col md={6}>
              <TextInput
                label="Name"
                placeholder="e.g Shockbreaker Ohlins"
                value={input.name_input}
                onChange={handleInput('name_input')}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <Select
                label="Category"
                placeholder="Select Category"
                rightSection={<IconChevronDown size={14} />}
                value={input.category}
                onChange={handleInput('category', true)}
                data={[
                  { value: 'Body', label: 'Body' },
                  { value: 'Drivetrain', label: 'Drivetrain' },
                ]}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <TextInput
                label="Part Brand"
                placeholder="e.g Dekson"
                value={input.brand_input}
                onChange={handleInput('brand_input')}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <Select
                label="Part Material"
                placeholder="Part Material"
                rightSection={<IconChevronDown size={14} />}
                data={[
                  { value: 'Part Material 1', label: 'Part Material 1' },
                  { value: 'Part Material 2', label: 'Part Material 2' },
                  { value: 'Part Material 3', label: 'Part Material 3' },
                ]}
                value={input.material_input}
                onChange={handleInput('material_input', true)}
              />
            </Grid.Col>

            <Grid.Col md={6}>
              <NumberInput
                label="Req. Pcs"
                placeholder="e.g 10"
                rightSection={displacementRight}
                value={input.req_pcs_input}
                onChange={(v) => {
                  handleInput('req_pcs_input', true)(v);
                }}
              />
            </Grid.Col>
            <Grid.Col md={6} />

            <Grid.Col md={6}>
              {input.vendor.map((vendor: any, ti: number) => (
                <>
                  <div key={ti} className="flex flex-row justify-between items-center">
                    <Text className="mt-[1rem] mb-[1rem] text-[20px]" weight={700}>
                      Vendor
                    </Text>
                    <div className="flex flex-row" style={{}}>
                      {ti === 0 && (
                        <Anchor
                          component="button"
                          className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                          onClick={addVendor}
                        >
                          <div className="flex h-max items-end pb-[3px]">
                            <Plus color="red" width="16" height="16" />
                          </div>
                          <Text className="pl-2">Add Vendor</Text>
                        </Anchor>
                      )}
                      {ti === 0 && input.vendor.length > 1 && <div className="flex items-center px-3">|</div>}
                      {(input.vendor.length > 1 || ti > 0) && (
                        <Anchor
                          component="button"
                          className="flex my-4 text-sm text-danger items-end justify-center flex-row"
                          onClick={() => removeVendor(ti)}
                        >
                          <div className="flex h-max items-end pb-[3px]">
                            <Trash color="red" width="16" height="16" />
                          </div>
                          <Text className="pl-2">Delete Vendor</Text>
                        </Anchor>
                      )}
                    </div>
                  </div>
                  <Select
                    label="Vendor"
                    placeholder="Select Vendor"
                    rightSection={<IconChevronDown size={14} />}
                    data={dataVendor ? dataVendor.map((y) => ({ value: y.ID.toString(), label: y.name })) : []}
                    value={input.vendor?.[ti].vendor_id.toString()}
                    onChange={handleInputVendor(ti)}
                  />
                </>
              ))}
            </Grid.Col>
            <Grid.Col md={6} />

            <Grid.Col md={8} />
            <Grid.Col md={2}>
              <Button className={`${classes.cancel} hover:bg-transparent`} onClick={() => router.back()}>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col md={2}>
              <Button className={`${classes.root} bg-black hover:bg-black`} type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </form>
    </>
  );
}

export default EditPartPage;
