import * as React from 'react';
import { Box, Group, Container, ActionIcon, MediaQuery } from '@mantine/core';
import { Menu2 } from 'tabler-icons-react';

interface Props {
  handlers: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}

const Header = ({ handlers }: Props) => (
  <Box
    component="header"
    sx={(theme) => ({
      padding: `15px 10px`,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    })}
  >
    <Container>
      <Group spacing="lg" noWrap>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <ActionIcon radius="xl" size={40} onClick={handlers.open}>
            <Menu2 />
          </ActionIcon>
        </MediaQuery>
      </Group>
    </Container>
  </Box>
);

export default Header;
