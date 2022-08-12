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
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState("dark");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

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
                label: 'flex justify-start items-center w-[110px] flex-shrink-0 max-width-[45%] font-normal'
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
                input: 'bg-red'
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
              navbar={<Navbar opened={opened} />}
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
