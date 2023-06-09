import { Navbar, ScrollArea, Text } from '@mantine/core';
import LinksGroup from '@components/NavbarLinksGroup/NavbarLinksGroup';
import { ISidebar } from '@contracts/navigation';
import Automobile from 'icons/Automobile';
import Power from 'icons/Power';
import Client from 'icons/Client';
import Vendor from 'icons/Vendor';
import Part from 'icons/Part';
import Project from 'icons/Project';

import JobReport from 'icons/JobReport';
import Payroll from 'icons/Payroll';
import Expenes from 'icons/Expenes';

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
            { label: 'EV', link: '#', isSubMenu: true },
          ],
        },
        {
          label: 'Parts',
          icon: (color: string) => <Part color={color} width="20" height="20" />,
          sub: [
            { label: 'Master', link: '/part/master-part', isSubMenu: true },
            { label: 'List', link: '/part/list-part', isSubMenu: true },
          ],
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
          label: 'Engineers',
          link: '/engineer',
          icon: (color: string) => <Vendor color={color} width="20" height="20" />,
        },
      ],
    },
    {
      group: 'Workshop',
      menus: [
        {
          label: 'Projects',
          icon: (color: string) => <Project color={color} width="20" height="20" />,
          sub: [
            { label: 'Part Diagnose', link: '/project/part-diagnose', isSubMenu: true },
            { label: 'List', link: '/project/list-project', isSubMenu: true },
          ],
        },
        {
          label: 'Job Report',
          icon: (color: string) => <JobReport color={color} width="20" height="20" />,
          sub: [
            { label: 'Hourly', link: '/jobreport/hourly', isSubMenu: true },
            { label: 'Daily', link: '/jobreport/daily', isSubMenu: true },
          ],
        },
      ],
    },
    {
      group: 'Finance',
      menus: [
        {
          label: 'Income',
          link: '/incomes',
          icon: (color: string) => <Expenes color={color} width="20" height="20" />,
        },
        {
          label: 'Expenses',
          link: '/expenses',
          icon: (color: string) => <Expenes color={color} width="20" height="20" />,
        },
        {
          label: 'Payroll',
          link: '/payroll',
          icon: (color: string) => <Payroll color={color} width="20" height="20" />,
        },
      ],
    },
    {
      group: 'User & Access',
      menus: [
        {
          label: 'User',
          link: '/user',
          icon: (color: string) => <Client color={color} width="20" height="20" />,
        },
        {
          label: 'Role',
          link: '/role',
          icon: (color: string) => <Client color={color} width="20" height="20" />,
        },
        {
          label: 'Permission',
          link: '/permission',
          icon: (color: string) => <Client color={color} width="20" height="20" />,
        },
      ],
    },
  ];

  return (
    <Navbar hidden={!props.opened} width={{ sm: 140, lg: 240 }} style={{ paddingTop: -70 }}>
      <ScrollArea>
        {sideMenus.map(({ group, menus }) => (
          <Navbar.Section key={group}>
            <Text size="xs" weight={500} style={{ padding: '14px', background: 'rgba(44, 44, 44, 0.05)' }}>
              {group}
            </Text>
            <div>
              {menus.map((item) => (
                <LinksGroup key={item.label} {...item} showMenu={props.showMenu} />
              ))}
            </div>
          </Navbar.Section>
        ))}
      </ScrollArea>
    </Navbar>
  );
}
