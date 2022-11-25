/* eslint-disable jsx-a11y/alt-text */

import { fetcher } from '@api/fetcher';
import { IResToken } from '@contracts/response-interface';
import useInput from '@hooks/useInput';
import { Button, Grid, Text, TextInput, PasswordInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Cookies from 'js-cookie';
import { setGlobal } from 'reactn';
import { useRouter } from 'next/router';

/* eslint-disable @next/next/no-img-element */

function LoginPage() {
  const router = useRouter();
  const [input, handleInput] = useInput({
    email: '',
    password: '',
  });

  const doSubmit = async (e: any) => {
    e.preventDefault();
    const response: IResToken | undefined = await fetcher('/api/v1/login', {
      method: 'POST',
      body: {
        email: input.email,
        password: input.password,
      },
    });
    console.log('Response from API ', response);
    if (response) {
      Cookies.set('token', response.token);
      Cookies.set('email', input.email);
      setGlobal({
        email: Cookies.get('email'),
      });
      showNotification({
        title: 'Success',
        message: 'Berhasil masuk',
        color: 'teal',
      });
      router.push('/');
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-screen flex items-center justify-center">
        <form onSubmit={doSubmit}>
          <Grid gutter="xl" className=" flex-row p-12">
            <div className="flex-col p-3">
              <Text className=" text-[20px] " weight={700}>
                Masuk
              </Text>
              <Text className=" text-[14px] " weight={400}>
                Selamat datang di ARMS
              </Text>
            </div>
            <Grid.Col md={12}>
              <TextInput
                className="flex-col mb-6"
                label="Email"
                placeholder="Email"
                value={input.email}
                onChange={handleInput('email')}
              />
              <PasswordInput
                className="flex-col"
                label="Password"
                value={input.password}
                onChange={handleInput('password')}
                placeholder="Password"
              />
            </Grid.Col>
            <Button className="bg-black hover:bg-black w-full h-14 m-3" type="submit">
              Masuk
            </Button>
          </Grid>
        </form>
      </div>
      <div className="h-screen w-1/2 bg-green-400">
        <img src="/bg-login.jpg" className="w-full h-full" />
      </div>
    </div>
  );
}

export default LoginPage;
