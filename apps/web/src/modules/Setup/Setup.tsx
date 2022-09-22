import * as React from 'react';
import { Container, Stack, Tabs } from '@mantine/core';

import Header from 'src/components/Header/Header';

const Setup = () => (
  <Container>
    <Stack spacing={20}>
      <Header
        title="Setup"
        text="Manage all your store informations, settings, employees, etc."
        showButton={true}
        buttonText="New customer"
        onClick={() => console.log('clicked!')}
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
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Tab value="outlets">Outlets</Tabs.Tab>
          <Tabs.Tab value="registers">Registers</Tabs.Tab>
          <Tabs.Tab value="sales-taxes">Sales Taxes</Tabs.Tab>
          <Tabs.Tab value="users">Users</Tabs.Tab>
          <Tabs.Tab value="roles">Roles</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">general</Tabs.Panel>

        <Tabs.Panel value="billing">billing</Tabs.Panel>

        <Tabs.Panel value="outlets">outlets</Tabs.Panel>

        <Tabs.Panel value="registers">registers</Tabs.Panel>

        <Tabs.Panel value="sales-taxes">sales-taxes</Tabs.Panel>

        <Tabs.Panel value="users">users</Tabs.Panel>

        <Tabs.Panel value="roles">roles</Tabs.Panel>
      </Tabs>
    </Stack>
  </Container>
);

export default Setup;
