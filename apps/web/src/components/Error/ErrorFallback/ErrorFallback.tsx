import * as React from 'react';
import type { FallbackProps } from 'react-error-boundary';
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

import FailedToFetch from 'src/images/failed-to-fetch.svg';

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

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const { classes } = useStyles();

  return (
    <Container>
      <Stack spacing={20}>
        <Center>
          <Image src={FailedToFetch} width={200} alt="Failed to fetch image" />
        </Center>
        <Title className={classes.title}>Ooops... something went wrong!</Title>
        <Text
          color="dimmed"
          size="md"
          align="center"
          className={classes.description}
        >
          Unfortunately, we were unable to load the page. Please try again
          later. If the problem persists, please contact us.
        </Text>
        <Group position="center">
          <Button variant="light" size="md" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default ErrorFallback;
