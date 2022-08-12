import { Center, Text } from "@mantine/core";

export function RightSection({
    label = "label"
}) {
    return (
        <>
            <Text color="dimmed" size={'sm'} style={{}} >
                <Center>
                    {label}
                </Center>
            </Text>
        </>
    )
}
