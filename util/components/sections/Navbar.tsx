import { Button, Navbar, Text } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconCar,
  IconUser
} from '@tabler/icons';
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavbarComponent(props:any) {
  const router = useRouter();
  const databaseMenus = [
    {
      'label': 'Automobile',
      'link': '/automobile',
      'icon': <IconCar />
    },
    {
      'label': 'User',
      'link': '/users',
      'icon': <IconUser />
    },
  ]

  return (
    <Navbar
      width={{ sm: 140, lg: 240 }}
      style={{ paddingTop: -70 }}
    >
      <Navbar.Section grow>
        <Text size="xs" weight={500} style={{padding: '14px'}}>
            Database
          </Text>
        {databaseMenus.map((dm, dmi) => (
          <NavLink key={dmi} name={dm.label} icon={dm.icon} link={dm.link} active={dm.link == router.asPath} onChange={props.onChange} />
        ))} 
      </Navbar.Section>
    </Navbar>
  );
}

function NavLink(props:any) {
  return (
    <Link href={props.link}>
      <button style={{ display: "flex", width:'100%', flexDirection: "row", padding:'14px', borderRight: props.active ? '2px solid' : '0px', borderRightColor: props.active ? 'black' : 'transparent'}} onClick={()=>props.onChange(props.link)}>
        {props.icon}
        <Text style={{ marginLeft: 10, color: props.active ? 'black' : '#828282'  }}>{props.name}</Text>
      </button>
    </Link>
  );
}
