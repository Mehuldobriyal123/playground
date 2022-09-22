import * as React from 'react';
import {
  Header as MantineHeader,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Group,
  createStyles,
} from '@mantine/core';

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = createStyles((theme) => ({
  title: {
    letterSpacing: '-.040em',
    textIndent: '-0.020em',
  },
}));

const Header = ({ opened, setOpened }: Props) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <MantineHeader height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Group position="apart">
          <Title className={classes.title}>amaaru</Title>
        </Group>
      </div>
    </MantineHeader>
  );
};

export default Header;
