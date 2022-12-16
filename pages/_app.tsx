import Head from 'next/head';
import { useEffect, useState } from 'react';
import { MantineProvider, AppShell } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import React, { setGlobal } from 'reactn';
import Header from '@components/Sections/Header';
import Navbar from '@components/Sections/Navbar';
import '../styles/globals.css';
import { SWRConfig } from 'swr';
import { fetcher } from '@api/fetcher';
import ErrorBoundary from '@components/ErrorBoundary';
// eslint-disable-next-line import/order
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import LoginPage from './login';

function Application({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();
  const [opened, showMenu] = useState(false);
  const [colorScheme, setColorScheme] = useState('dark');
  const [isLoading, setLoading] = useState(true);
  const [openLoginPage, setOpenLogin] = useState(true);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (Cookies.get('token') !== undefined) {
        setGlobal({
          email: Cookies.get('email'),
        });
      }
    }, 1000);
  }, []);
  const ad = router.pathname;
  useEffect(() => {
    const token = Cookies.get('token');
    if (ad === '/login' || token === undefined) {
      setOpenLogin(true);
      router.push('/login');
    } else {
      setOpenLogin(false);
    }
  }, [router.pathname]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (openLoginPage) {
    return <LoginPage />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          components: {
            // InputWrapper styling and props
            InputWrapper: {
              defaultProps: {
                inputWrapperOrder: ['label', 'error', 'input', 'description'],
              },
              classNames: {
                root: 'flex flex-grow',
                label: 'flex justify-start items-center w-[110px] flex-shrink-0 max-width-[45%] font-normal',
              },
            },

            // Input styling and props
            Input: {
              defaultProps: {
                variant: 'filled',
              },
              classNames: {
                wrapper: 'flex-grow',
                input: 'border-[#ccc] mt-0 flex-grow flex bg-white rounded-[8px] h-[48px]',
                // rightSection: 'flex w-[62px] h-100 bg-[#F5F5F5] justify-center align-center rounded-r border border-l-none'
              },
            },

            // Select styling and props
            Select: {
              classNames: {
                root: 'combobox-full',
                input: 'bg-red',
              },
            },
            MultiSelect: {
              classNames: {
                root: 'combobox-full',
              },
            },
            DatePicker: {
              classNames: {
                wrapper: 'flex-grow',
              },
            },
            Table: {
              styles: {
                root: {
                  '& thead tr th': {
                    paddingTop: '24px',
                    paddingBottom: '16px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    backgroundColor: '#f1f1f1',
                  },
                  '& tbody tr td': {
                    padding: '24px',
                  },
                },
              },
            },
            Navbar: {
              classNames: {
                root: 'min-w-[240px]',
              },
            },
          },
        }}
      >
        <NotificationsProvider>
          <ModalsProvider>
            <AppShell
              // padding="lg"
              header={<Header opened={opened} setOpened={showMenu} toggleColorScheme={toggleColorScheme} />}
              navbar={<Navbar opened={opened} showMenu={showMenu} />}
              styles={() => ({
                main: {
                  backgroundColor: '#FFFFFF',
                },
              })}
            >
              <SWRConfig
                value={{
                  fetcher: (url: string) => fetcher(url),
                  suspense: true,
                }}
              >
                <ErrorBoundary FallbackComponent={<div>Error</div>}>
                  <Component {...pageProps} />
                </ErrorBoundary>
              </SWRConfig>
            </AppShell>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default Application;
