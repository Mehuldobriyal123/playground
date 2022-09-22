import * as React from 'react';
import {
  Container,
  Stack,
  Tabs,
  TextInput,
  SimpleGrid,
  Checkbox,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Search, IdBadge } from 'tabler-icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { openModal } from '@mantine/modals';

import { makeData, Person } from 'src/utils/makeData';

import Header from 'src/components/Header/Header';
import Table from 'src/components/Table/Table';

import NewSupplierModal from 'src/components/Modal/NewSupplierModal/NewSupplierModal';

const Suppliers = () => {
  const [data] = React.useState(() => makeData(1000));

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllPageRowsSelected(),
              indeterminate: table.getIsSomePageRowsSelected(),
              onChange: table.getToggleAllPageRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        id: 'firstName',
        header: () => <span>First name</span>,
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
      },
      {
        id: 'lastName',
        header: () => <span>Last name</span>,
        accessorKey: 'lastName',
        cell: (info) => info.getValue(),
      },
      {
        id: 'email',
        header: () => <span>Email</span>,
        accessorKey: 'email',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  return (
    <Container>
      <Stack spacing={20}>
        <Header
          title="Suppliers"
          text="View and manage your suppliers."
          showButton={true}
          buttonText="New supplier"
          onClick={() => {
            openModal({
              children: <NewSupplierModal />,
              title: 'Create supplier',
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
                    placeholder="Search supplier by name, company, address"
                    label="Search"
                    icon={<Search size={16} />}
                    size="md"
                  />

                  <SimpleGrid cols={3}>
                    <TextInput
                      placeholder="Your supplier code"
                      label="Code"
                      icon={<IdBadge size={16} />}
                      size="md"
                    />
                    <DatePicker
                      size="md"
                      placeholder="Pick your date"
                      label="Created at"
                    />
                    <DatePicker
                      size="md"
                      placeholder="Pick your date"
                      label="Updated at"
                    />
                  </SimpleGrid>
                </Stack>

                <Table data={data} columns={columns} />
              </Stack>
            </Container>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Suppliers;
