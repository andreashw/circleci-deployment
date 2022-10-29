import { useEffect, useState } from 'react';
import { Group, Collapse, Text, UnstyledButton, createStyles, Anchor } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import Router, { useRouter } from 'next/router';
import { ILinkProps, ILinkGroup } from '@contracts/navigation';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    // padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,

    // '&:hover': {
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    //   color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    // },
  },

  chevron: {
    transition: 'transform 200ms ease',
    marginRight: '20px',
  },
}));

function NavLink({ icon, label, link, active, isSubMenu, onClicked }: ILinkProps) {
  const [color, setColor] = useState('#828282');
  const [style, setStyle] = useState({});
  const [isLink, setIslink] = useState(false);

  useEffect(() => {
    setColor(active ? 'black' : '#828282');
    setStyle({
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      padding: '14px',
      borderRight: active ? '2px solid' : '0px',
      borderRightColor: active ? 'black' : 'transparent',
    });
    setIslink(Boolean(link));
  }, [active]);

  const openLink = (_link: string) => {
    if (onClicked) {
      onClicked();
    }
    Router.push(_link);
  };

  return (
    <>
      {isLink ? (
        <Anchor onClick={() => openLink(link || '')} component="button" className="w-full">
          <div style={style}>
            {icon && icon('black')}
            <Text className="cursor-pointer" style={{ marginLeft: isSubMenu ? 40 : 20, color }}>
              {label}
            </Text>
          </div>
        </Anchor>
      ) : (
        <Anchor component="div">
          <div style={style}>
            {icon && icon('black')}
            <Text className="cursor-pointer ml-3" style={{ color, marginLeft: 20 }}>
              {label}
            </Text>
          </div>
        </Anchor>
      )}
    </>
  );
}

export default function LinksGroup({ icon, label, sub, link, showMenu }: ILinkGroup) {
  const router = useRouter();
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(sub);
  const [opened, setOpened] = useState(false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control} component="div">
        <Group position="apart" spacing={0}>
          <NavLink
            label={label}
            icon={icon}
            link={link}
            active={link ? router.asPath.includes(link || '') : false}
            onClicked={() => showMenu(false)}
          />
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          {sub.map((menu) => (
            <NavLink
              key={menu.label}
              active={menu.link ? router.asPath.includes(menu.link) : false}
              onClicked={() => showMenu(false)}
              {...menu}
            />
          ))}
        </Collapse>
      ) : null}
    </>
  );
}
