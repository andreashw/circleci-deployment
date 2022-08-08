import { Button, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import validator from "validator";

export default function EditProfileForm(props:any) {
  const form = useForm({
    initialValues: props.data,

    validate: {
      name: (name) => name.length > 0,
      email: (email) => validator.isEmail(email),
      address: (address) => address.length > 0,
      workplace: (workplace) => workplace.length > 0,
      phone: (phone) => validator.isMobilePhone(phone),
    },

    // initialErrors: {
    //   name: "Valós nevet adjon meg!",
    //   email: "Érvényes e-mail címet adjon meg!",
    //   address: "Valós lakcímet adjon meg!",
    //   workplace: "Valós munkahelyet adjon meg!",
    //   phone: "Valós telefonszámot adjon meg!",
    // },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => props.submitForm(props.data, values))}
    >
      <TextInput
        label="Név"
        placeholder="Név"
        {...form.getInputProps("name")}
      />

      <TextInput
        label="E-mail cím"
        placeholder="E-mail cím"
        {...form.getInputProps("email")}
      />

      <TextInput
        label="Lakcím"
        placeholder="Lakcím"
        {...form.getInputProps("address")}
      />

      <TextInput
        label="Munkahely"
        placeholder="Munkahely"
        {...form.getInputProps("workplace")}
      />

      <TextInput
        label="Telefonszám"
        placeholder="Telefonszám"
        {...form.getInputProps("phone")}
      />

      <Button mt={20} type="submit">
        Módosítás
      </Button>
    </form>
  );
}
