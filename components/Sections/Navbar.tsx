import { Navbar, Text } from '@mantine/core';
import LinksGroup from '@components/NavbarLinksGroup/NavbarLinksGroup';
import { ISidebar } from '@contracts/navigation';
import Automobile from 'icons/Automobile';
import Power from 'icons/Power';
import Client from 'icons/Client';
import Vendor from 'icons/Vendor';
import Part from 'icons/Part';
import Project from 'icons/Project';

export default function NavbarComponent(props: any) {
  const sideMenus: ISidebar[] = [
    {
      group: 'Database',
      menus: [
        {
          label: 'Automobile',
          link: '/automobile',
          icon: (color: string) => <Automobile color={color} width="20" height="20" />,
        },
        {
          label: 'Power',
          icon: (color: string) => <Power color={color} width="20" height="20" />,
          sub: [
            { label: 'Engine', link: '/engine', isSubMenu: true },
            { label: 'EV', link: '/ev', isSubMenu: true },
          ],
        },

        {
          label: 'Parts',
          link: '/part',
          icon: (color: string) => <Part color={color} width="20" height="20" />,
        },

        {
          label: 'Clients',
          link: '/client',
          icon: (color: string) => <Client color={color} width="20" height="20" />,
        },
        {
          label: 'Vendor',
          link: '/vendor',
          icon: (color: string) => <Vendor color={color} width="20" height="20" />,
        },
        {
          label: 'Workshop',
          link: '/vendor',
          icon: null,
        },
        {
          label: 'Projects',
          link: '/project/add',
          icon: (color: string) => <Project color={color} width="20" height="20" />,
        },
      ],
    },
  ];

  return (
    <Navbar hidden={!props.opened} width={{ sm: 140, lg: 240 }} style={{ paddingTop: -70 }}>
      {sideMenus.map(({ group, menus }) => (
        <Navbar.Section key={group} grow>
          <Text size="xs" weight={500} style={{ padding: '14px' }}>
            {group}
          </Text>
          <div>
            {menus.map((item) => (
              <LinksGroup key={item.label} {...item} />
            ))}
          </div>
        </Navbar.Section>
      ))}
    </Navbar>
  );
}
