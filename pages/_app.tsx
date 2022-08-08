import Head from "next/head";
import { useEffect, useState } from "react";
import { MantineProvider, AppShell, ColorSchemeProvider, ScrollArea } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import Header from "../util/components/sections/Header";
import Navbar from "../util/components/sections/Navbar";
import "../styles/globals.css"
import { useRouter } from "next/router";

function Application({ Component, pageProps }:{Component:any, pageProps:any }) {
  const router = useRouter()

  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState("dark");
  const [activeMenu, setActiveMenu] = useState('/automobile');

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if(router.asPath != activeMenu) setActiveMenu(router.asPath)
  },[activeMenu])

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
                  label: 'flex justify-start items-center w-[90px] flex-shrink-0 max-width-[35%] font-normal'
                },
              },

              // Input styling and props
              Input: {
                defaultProps: {
                  variant: 'filled',
                },
                classNames: {
                  wrapper: 'flex-grow',
                  input: 'border-[#ccc] mt-0 flex-grow flex bg-white rounded-[8px]',
                  rightSection: 'flex w-[62px] h-100 bg-[#F5F5F5] justify-center align-center rounded-br-[8px] rounded-tr-[8px]'
                },
              },

              // Select styling and props
              Select: {
                classNames: {
                  root: 'combobox-full'
                }
              },
            },
          }}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <AppShell
                padding="lg"
                header={
                  <Header
                    opened={opened}
                    setOpened={setOpened}
                    toggleColorScheme={toggleColorScheme}
                  />
                }
                navbar={<Navbar activeMenu={activeMenu} onChange={setActiveMenu} />}
                styles={(theme) => ({
                  main: {
                    backgroundColor: '#FFFFFF',
                  },
                })}
              >
                  <Component {...pageProps} />
              </AppShell>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
    </>
  );
}

export default Application;
