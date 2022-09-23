import * as React from 'react';
import { Container, Stack, TextInput, SimpleGrid } from '@mantine/core';
import { Search } from 'tabler-icons-react';

import Header from 'src/components/Header/Header';
import CheckoutItem from 'src/components/Checkout/CheckoutItem/CheckoutItem';

const Checkout = () => (
  <Container>
    <Stack spacing={20}>
      <Header
        title="Checkout"
        text="View and manage your checkout."
        showButton={false}
      />

      <TextInput
        placeholder="Search supplier by name, company, address"
        icon={<Search size={16} />}
        size="md"
      />

      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
        <CheckoutItem />
      </SimpleGrid>
    </Stack>
  </Container>
);

export default Checkout;
