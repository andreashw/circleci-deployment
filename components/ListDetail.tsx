import { Grid, Text } from '@mantine/core';

function ListDetail({ List = '', IsiList = '', classname = '' }) {
  return (
    <>
      <Grid.Col style={{ paddingTop: 0 }} md={2}>
        <Text className={`${classname} m-0`} color="#828282" size={16}>
          {List}
        </Text>
      </Grid.Col>
      <Grid.Col style={{ paddingTop: 0 }} md={6}>
        <Text color="#2C2C2C" size={16}>
          {IsiList}
        </Text>
      </Grid.Col>

      <Grid.Col md={4} />
    </>
  );
}

export default ListDetail;
