import { Center, Text } from '@mantine/core';

export function RightSection({ label = 'label' }) {
  return (
    <div className="flex bg-inactive h-full rounded-r-md px-4">
      <Text className="self-center" color="dimmed" size="sm">
        <Center>{label}</Center>
      </Text>
    </div>
  );
}

export function LeftSection({ label = 'label' }) {
  return (
    <div className="flex bg-inactive h-full rounded-l-md px-4">
      <Text className="self-center" color="dimmed" size="sm">
        <Center>{label}</Center>
      </Text>
    </div>
  );
}
