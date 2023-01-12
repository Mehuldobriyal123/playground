import * as React from 'react';
import { useQueryLoader, usePreloadedQuery, PreloadedQuery } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'tabler-icons-react';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  useMantineTheme,
} from '@mantine/core';

import ErrorBoundary from 'src/components/Error/ErrorBoundary/ErrorBoundary';
import ErrorLoginFallback from 'src/components/Error/ErrorLoginFallback/ErrorLoginFallback';

import { MeQuery } from 'src/queries/';
import type { MeQuery as MeQueryType } from 'src/queries/__generated__/MeQuery.graphql';

interface UserMenuProps {
  queryReference: PreloadedQuery<MeQueryType>;
  onReset: () => void;
}

const UserMenu = ({ queryReference, onReset }: UserMenuProps) => {
  const theme = useMantineTheme();
  const { me } = usePreloadedQuery<MeQueryType>(MeQuery, queryReference);
  const navigate = useNavigate();

  // We should render a sign in button if the user is not logged in.
  if (!me) {
    return (
      <Button variant="subtle" size="md" onClick={() => navigate('/signin')}>
        Sign in
      </Button>
    );
  }

  return (
    <Container
      sx={{
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      }}
    >
      <Group spacing="xs">
        <Avatar
          size={40}
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
        />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {me.firstName} {me.lastName}
          </Text>
          <Text color="dimmed" size="xs">
            {me.email}
          </Text>
        </Box>

        {theme.dir === 'ltr' ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </Group>
    </Container>
  );
};

const User = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<MeQueryType>(MeQuery);

  React.useEffect(() => {
    loadQuery({}, { fetchPolicy: 'store-and-network' });

    return () => {
      disposeQuery();
    };
  }, [loadQuery, disposeQuery]);

  const onReset = () => {
    loadQuery({}, { fetchPolicy: 'store-and-network' });
  };

  return (
    <Container p={0}>
      <UnstyledButton
        onClick={() => navigate('/settings')}
        sx={{
          display: 'block',
          width: '100%',
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        {queryReference && (
          <ErrorBoundary fallback={ErrorLoginFallback} onReset={onReset}>
            <React.Suspense
              fallback={
                <Container
                  sx={{
                    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                  }}
                >
                  <Group spacing="xs">
                    <Skeleton width={40} height={40} />

                    <Stack spacing={10} sx={{ flex: 1 }}>
                      <Skeleton height={10} />
                      <Skeleton height={10} />
                    </Stack>

                    {theme.dir === 'ltr' ? (
                      <ChevronRight size={18} />
                    ) : (
                      <ChevronLeft size={18} />
                    )}
                  </Group>
                </Container>
              }
            >
              <UserMenu queryReference={queryReference} onReset={onReset} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </UnstyledButton>
    </Container>
  );
};

export default User;
