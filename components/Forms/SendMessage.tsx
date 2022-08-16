import { Text, TextInput, Button, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function SendMessageForm(props: any) {
  const form = useForm({
    initialValues: {
      subject: '',
      message: '',
    },

    validate: {
      subject: (subject) => subject.length > 0,
      message: (message) => message.length > 0,
    },

    initialErrors: {
      subject: 'The object cannot be empty!',
      message: 'The message cannot be empty!',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => props.onSubmit(values.subject, values.message))}>
      <Text size="sm" mb={10}>
        send Message <b>{props.automobile.manufacturer}</b> address:
      </Text>
      <TextInput label="Object" placeholder="Object" mb={5} {...form.getInputProps('subject')} />
      <Textarea
        label="Message"
        placeholder="Message"
        autosize
        minRows={3}
        maxRows={10}
        {...form.getInputProps('message')}
      />
      <Button style={{ marginTop: 20 }} type="submit">
        Send
      </Button>
    </form>
  );
}
