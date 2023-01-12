import * as React from 'react';
import {
  Drawer as MantineDrawer,
  CloseButton,
  useMantineTheme,
} from '@mantine/core';

import NavBar from '../NavBar/NavBar';

interface Props {
  opened: boolean;
  handleClose: () => void;
}

const Drawer = ({ opened, handleClose }: Props) => {
  const theme = useMantineTheme();

  return (
    <MantineDrawer
      opened={opened}
      onClose={handleClose}
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.gray[2]
          : theme.colors.dark[9]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="auto"
      closeOnClickOutside={true}
      withCloseButton={false}
    >
      <CloseButton
        size="xl"
        radius="xl"
        variant="transparent"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          zIndex: 999,
          top: 8,
          right: -56,
          color: 'white',
          '&:not(:disabled):active': { transform: 'none' },
        }}
      />
      <NavBar opened={opened} handleClose={handleClose} />
    </MantineDrawer>
  );
};

export default Drawer;
