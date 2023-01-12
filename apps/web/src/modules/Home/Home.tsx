import * as React from 'react';
import { AppShell, Box, MediaQuery, Center, Loader } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useQueryLoader } from 'react-relay';
import { Routes, Route } from 'react-router-dom';

import NavBar from 'src/components/AppShell/NavBar/NavBar';
import Drawer from 'src/components/AppShell/Drawer/Drawer';
import Header from 'src/components/AppShell/Header/Header';

import ErrorBoundary from 'src/components/Error/ErrorBoundary/ErrorBoundary';
import ErrorFallback from 'src/components/Error/ErrorFallback/ErrorFallback';

import Checkout from 'src/modules/Checkout/Checkout';
import Customers from 'src/modules/Customers/Customers';
import Dashboard from 'src/modules/Dashboard/Dashboard';
import Products from 'src/modules/Products/Products';
import Sales from 'src/modules/Sales/Sales';
import Sellers from 'src/modules/Sellers/Sellers';
import Setup from 'src/modules/Setup/Setup';
import Suppliers from 'src/modules/Suppliers/Suppliers';

import { MeQuery } from 'src/queries/';
import type { MeQuery as MeQueryType } from 'src/queries/__generated__/MeQuery.graphql';

const Home = () => {
  const matches = useMediaQuery('(max-width: 800px)');
  const [opened, handlers] = useDisclosure(false);
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
    <AppShell
      padding="md"
      styles={(theme) => ({
        body: { minHeight: '100vh' },
        main: {
          padding: 0,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#FFFFFF',
        },
      })}
      navbar={
        <>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <NavBar opened={opened} handleClose={handlers.close} />
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Drawer opened={opened} handleClose={handlers.close} />
          </MediaQuery>
        </>
      }
    >
      {matches ? <Header handlers={handlers} /> : null}

      <Box py="xl" px="md">
        {queryReference && (
          <ErrorBoundary fallback={ErrorFallback} onReset={onReset}>
            <React.Suspense
              fallback={
                <Center>
                  <Loader variant="dots" />
                </Center>
              }
            >
              <Routes>
                <Route
                  path="*"
                  element={<Dashboard queryReference={queryReference} />}
                />
                <Route
                  path="checkout"
                  element={<Checkout queryReference={queryReference} />}
                />
                <Route
                  path="customers"
                  element={<Customers queryReference={queryReference} />}
                />
                <Route
                  path="products"
                  element={<Products queryReference={queryReference} />}
                />
                <Route
                  path="sales"
                  element={<Sales queryReference={queryReference} />}
                />
                <Route
                  path="sellers"
                  element={<Sellers queryReference={queryReference} />}
                />
                <Route
                  path="setup"
                  element={<Setup queryReference={queryReference} />}
                />
                <Route
                  path="suppliers"
                  element={<Suppliers queryReference={queryReference} />}
                />
              </Routes>
            </React.Suspense>
          </ErrorBoundary>
        )}
      </Box>
    </AppShell>
  );
};

export default Home;
