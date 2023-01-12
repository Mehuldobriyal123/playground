import * as React from 'react';
import { Container, Stack, Tabs, TextInput, SimpleGrid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Search, IdBadge } from 'tabler-icons-react';
import { openModal } from '@mantine/modals';
import { usePreloadedQuery, PreloadedQuery } from 'react-relay';

import Header from 'src/components/Header/Header';
import NotAuthenticated from 'src/components/Error/NotAuthenticated/NotAuthenticated';

import NewProductModal from 'src/components/Modal/NewProductModal/NewProductModal';

import { MeQuery } from 'src/queries/';
import { MeQuery as MeQueryType } from 'src/queries/__generated__/MeQuery.graphql';

interface Props {
  queryReference: PreloadedQuery<MeQueryType>;
}

const Products = ({ queryReference }: Props) => {
  const data = usePreloadedQuery<MeQueryType>(MeQuery, queryReference);

  if (!data.me) {
    return <NotAuthenticated />;
  }

  return (
    <Container>
      <Stack spacing={20}>
        <Header
          title="Products"
          text="View and manage your products."
          showButton={true}
          buttonText="New product"
          onClick={() => {
            openModal({
              children: <NewProductModal />,
              title: 'Create product',
            });
          }}
        />

        <Tabs
          defaultValue="general"
          styles={(theme) => ({
            tabLabel: {
              fontSize: theme.fontSizes.md,
              fontWeight: 600,
              letterSpacing: '-.016em',
            },
          })}
        >
          <Tabs.List>
            <Tabs.Tab value="general">General</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general">
            <Container p={0} m={0} pt={20} pb={20}>
              <Stack spacing={30}>
                <Stack spacing={20}>
                  <TextInput
                    variant="filled"
                    placeholder="Search supplier by name, company, address"
                    label="Search"
                    icon={<Search size={16} />}
                    size="md"
                  />

                  <SimpleGrid cols={3}>
                    <TextInput
                      variant="filled"
                      placeholder="Your supplier code"
                      label="Code"
                      icon={<IdBadge size={16} />}
                      size="md"
                    />
                    <DatePicker
                      variant="filled"
                      size="md"
                      placeholder="Pick your date"
                      label="Created at"
                    />
                    <DatePicker
                      variant="filled"
                      size="md"
                      placeholder="Pick your date"
                      label="Updated at"
                    />
                  </SimpleGrid>
                </Stack>
              </Stack>
            </Container>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Products;
