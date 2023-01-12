import * as React from 'react';
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Image,
  Center,
  Stack,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import LoggedOut from 'src/images/logged-out.svg';

const useStyles = createStyles((theme) => ({
  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    letterSpacing: '-0.030em',
    fontWeight: 700,
    alignSelf: 'center',
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
  },
}));

const NotAuthenticated = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Container>
      <Stack spacing={20}>
        <Center>
          <Image src={LoggedOut} width={200} alt="Failed to fetch image" />
        </Center>
        <Title className={classes.title}>You need to be logged in</Title>
        <Text
          color="dimmed"
          size="md"
          align="center"
          className={classes.description}
        >
          You need to be logged in to access this page. Please login or register
          to continue.
        </Text>
        <Group position="center">
          <Button variant="light" size="md" onClick={() => navigate('/signin')}>
            Sign in
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default NotAuthenticated;
