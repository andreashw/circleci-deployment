import { Grid, Select } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';

interface RegionSelectProps {
  valProvince?: string;
  valCities?: string;
  province: any[];
  cities: any[];
  onProvinceChange?: (val: any) => void;
  onCitiesChange?: (val: any) => void;
}
function RegionSelect({
  onProvinceChange,
  valProvince,
  province,
  cities,
  valCities,
  onCitiesChange,
}: RegionSelectProps) {
  return (
    <>
      <Grid.Col md={6}>
        <Select
          label="Province"
          placeholder="Select Province"
          rightSection={<IconChevronDown size={14} />}
          onChange={onProvinceChange}
          value={valProvince}
          data={province}
        />
      </Grid.Col>

      <Grid.Col md={6}>
        <Select
          label="City"
          placeholder="Select City"
          rightSection={<IconChevronDown size={14} />}
          onChange={onCitiesChange}
          value={valCities}
          data={cities}
        />
      </Grid.Col>
    </>
  );
}

export default RegionSelect;
