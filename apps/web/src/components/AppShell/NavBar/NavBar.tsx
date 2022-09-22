import * as React from 'react';
import { Navbar as MantineNavBar, createStyles, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  BellRinging,
  ShoppingCart,
  ReportMoney,
  UserCircle,
  Package,
  Users,
  Box,
  Settings,
} from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      fontWeight: 600,
      letterSpacing: '-.016em',
      borderRadius: 3,

      '&:hover': {
        backgroundColor: theme.colors.pink[1],
        textDecoration: 'none',
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colors.gray,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colors.pink[6],
        color: 'white',
        textDecoration: 'none',
        [`& .${icon}`]: {
          opacity: 0.9,
          color: 'white',
          textDecoration: 'none',
        },
      },
    },
  };
});

const data = [
  { link: '/', label: 'Home', icon: BellRinging },
  { link: 'checkout', label: 'Checkout', icon: ShoppingCart },
  { link: 'sales', label: 'Sales', icon: ReportMoney },
  { link: 'sellers', label: 'Sellers', icon: UserCircle },
  { link: 'products', label: 'Products', icon: Package },
  { link: 'customers', label: 'Customers', icon: Users },
  { link: 'suppliers', label: 'Suppliers', icon: Box },
  { link: 'setup', label: 'Setup', icon: Settings },
];

interface Props {
  opened: boolean;
}

const NavBar = ({ opened }: Props) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = React.useState<string>('Home');

  const links = data.map((item) => (
    <Anchor
      component={Link}
      to={item.link}
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Anchor>
  ));

  return (
    <MantineNavBar
      p="md"
      hiddenBreakpoint="sm"
      hidden={opened}
      width={{ sm: 200, lg: 300 }}
    >
      <MantineNavBar.Section grow>{links}</MantineNavBar.Section>
    </MantineNavBar>
  );
};

export default NavBar;
