import { Center, Text } from "@mantine/core";

export function RightSection({
    label = "label"
}) {
    return (
        <>
            <Text  color="dimmed" size={'sm'} sx={{ cursor: 'help' }}>
                <Center>
                    {label}
                </Center>
            </Text>
        </>
    )
}
