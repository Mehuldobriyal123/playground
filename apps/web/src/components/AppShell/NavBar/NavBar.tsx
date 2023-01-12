import * as React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, Navbar, Group, Anchor } from '@mantine/core';
import { ReportMoney, PigMoney, ChartBar, Home2 } from 'tabler-icons-react';

import User from '../User/User';

interface Props {
  opened: boolean;
  handleClose: () => void;
  className?: string;
}

const useStyles = createStyles<string, { collapsed?: boolean }>(
  (theme, params, getRef) => {
    const icon: string = getRef('icon');

    return {
      navbar: {
        position: 'sticky',
        top: 0,
        width: params?.collapsed ? 81 : 290,
        transition: params?.collapsed ? 'width 0.1s linear' : 'none',
      },

      header: {
        marginBottom: theme.spacing.md,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.gray[2]
        }`,
      },

      footer: {
        paddingRight: 10,
        paddingTop: theme.spacing.xs,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.gray[2]
        }`,
      },

      logo: {
        ...theme.fn.focusStyles(),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        columnGap: theme.spacing.sm,
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 700,
      },

      link: {
        ...theme.fn.focusStyles(),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        columnGap: theme.spacing.sm,
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[6],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
          textDecoration: 'none',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
          color:
            theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[6],

          [`& .${icon}`]: {
            color:
              theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[6],
          },
        },
      },

      linkActive: {
        textDecoration: 'none',

        '&, &:hover': {
          backgroundColor: theme.colors[theme.primaryColor][7],
          color: '#FFFFFF',
          [`& .${icon}`]: {
            color: '#FFFFFF',
          },
        },
      },

      linkIcon: {
        ref: icon,
        color: theme.colors.gray[6],
      },

      linkLabel: params?.collapsed ? { display: 'none' } : {},
    };
  },
);

const SideNav = ({ className, opened, handleClose }: Props) => {
  const { classes, cx } = useStyles({});
  const [active, setActive] = React.useState<string>('Home');

  const onHandleClose = () => {
    if (opened) {
      handleClose();
    }
  };

  return (
    <Navbar p="md" className={cx(classes.navbar, className)}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Anchor
            component={Link}
            className={classes.link}
            to="/bets"
            key="/bets"
          >
            <span className={classes.linkLabel}>Playground</span>
          </Anchor>
        </Group>

        <Anchor
          component={Link}
          to="/"
          className={cx(classes.link, {
            [classes.linkActive]: 'Dashboard' === active,
          })}
          key="Dashboard"
          onClick={() => {
            setActive('Dashboard');
            onHandleClose();
          }}
        >
          <Home2 className={classes.linkIcon} />
          <span className={classes.linkLabel}>Dashboard</span>
        </Anchor>

        <Anchor
          component={Link}
          to="/bets"
          className={cx(classes.link, {
            [classes.linkActive]: 'Bets' === active,
          })}
          key="Bets"
          onClick={() => {
            setActive('Bets');
            onHandleClose();
          }}
        >
          <ReportMoney className={classes.linkIcon} />
          <span className={classes.linkLabel}>Bets</span>
        </Anchor>

        <Anchor
          component={Link}
          to="/bankrolls"
          className={cx(classes.link, {
            [classes.linkActive]: 'Bankrolls' === active,
          })}
          key="Bankrolls"
          onClick={() => {
            setActive('Bankrolls');
            onHandleClose();
          }}
        >
          <PigMoney className={classes.linkIcon} />
          <span className={classes.linkLabel}>Bankrolls</span>
        </Anchor>

        <Anchor
          component={Link}
          to="/stats"
          className={cx(classes.link, {
            [classes.linkActive]: 'Stats' === active,
          })}
          key="Stats"
          onClick={() => {
            setActive('Stats');
            onHandleClose();
          }}
        >
          <ChartBar className={classes.linkIcon} />
          <span className={classes.linkLabel}>Stats</span>
        </Anchor>
      </Navbar.Section>

      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};

export default SideNav;
