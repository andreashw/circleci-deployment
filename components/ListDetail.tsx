import { Grid, Text } from '@mantine/core';

function ListDetail({ List = '', IsiList = '' }) {
  return (
    <>
      <Grid.Col style={{ paddingTop: 0 }} md={2}>
        <Text className="m-0" color="#828282" size={16}>
          {List}
        </Text>
      </Grid.Col>
      <Grid.Col style={{ paddingTop: 0 }} md={10}>
        <Text color="#2C2C2C" size={16}>
          {IsiList}
        </Text>
      </Grid.Col>
    </>
  );
}

export default ListDetail;
