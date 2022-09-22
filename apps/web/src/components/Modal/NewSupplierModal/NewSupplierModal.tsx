import * as React from 'react';
import { Stack, Group, Button, Tabs, TextInput } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';

const NewSupplierModal = () => {
  return (
    <Stack spacing={20}>
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
          <Tabs.Tab value="additional">Additional information</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Stack spacing={20} mt={20}>
            <TextInput
              placeholder="Add first name"
              label="First name"
              size="md"
            />

            <TextInput
              placeholder="Add last name"
              label="Last name"
              size="md"
            />

            <TextInput placeholder="hello@amaaru.com" label="Email" size="md" />

            <TextInput placeholder="Add phone" label="Phone" size="md" />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="additional">
          <Stack spacing={20} mt={20}>
            <TextInput placeholder="Add street" label="Street" size="md" />

            <TextInput placeholder="City" label="City" size="md" />

            <TextInput placeholder="1440000" label="Postal code" size="md" />
          </Stack>
        </Tabs.Panel>
      </Tabs>

      <Group position="right">
        <Button variant="default" onClick={() => closeAllModals()}>
          Cancel
        </Button>

        <Button variant="filled" onClick={() => closeAllModals()}>
          Create new supplier
        </Button>
      </Group>
    </Stack>
  );
};

export default NewSupplierModal;
