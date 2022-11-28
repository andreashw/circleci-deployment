import { Burger, Header, MediaQuery, Text, Popover } from '@mantine/core';
import React, { useGlobal } from 'reactn';
import { IconChevronDown } from '@tabler/icons';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function HeaderComponent(props: any) {
  const [email] = useGlobal('email');
  function logout() {
    Cookies.remove('token');
    Cookies.remove('email');
    Router.replace('/login');
  }
  return (
    <Header height={70} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger opened={props.opened} onClick={() => props.setOpened((o: any) => !o)} size="sm" mr="xl" />
        </MediaQuery>

        <Text weight={700}>ARMS</Text>

        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <div className="px-4 min-w-[200px] items-center justify-end flex">
                <p className="cursor-pointer px-2">{email}</p>
                <IconChevronDown size={14} />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm" onClick={() => logout()} className="cursor-pointer">
                Log Out
              </Text>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
    </Header>
  );
}
