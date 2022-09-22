import * as React from 'react';
import {
  createStyles,
  Stack,
  Table as MantineTable,
  Pagination,
  Box,
  Text,
  Center,
  Container,
} from '@mantine/core';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  RowSelectionState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
} from '@tanstack/react-table';

import { Person } from 'src/utils/makeData';

interface Props {
  data: Array<any>;
  columns: ColumnDef<Person, unknown>[];
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.gray[1],
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: 3,
  },

  th: {
    padding: '0 !important',
  },

  td: {
    backgroundColor: 'white',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
          : theme.colors[theme.primaryColor][0],
    },
  },

  text: {
    letterSpacing: '-.016em',
  },

  control: {
    width: '100%',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    backgroundColor: theme.colors.gray[1],
    border: 'none',
  },

  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

const Table = ({ data, columns }: Props) => {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { classes, cx } = useStyles();

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableSorting: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <Container className={classes.container} m={0} p={0} pb={10}>
      <Stack spacing={10}>
        <MantineTable horizontalSpacing="md" verticalSpacing="sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={classes.th}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      <Box component="button" className={classes.control}>
                        <Text weight={500} size="md">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Text>
                      </Box>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row: Row<Person>) => {
                return (
                  <tr
                    key={row.id}
                    className={classes.td}
                    onClick={() => console.log('go to custom page or expand')}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={cx({
                            [classes.rowSelected]: row.getIsSelected(),
                          })}
                        >
                          <Text className={classes.text} size="md">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Text>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </MantineTable>
        <Center>
          <Pagination
            styles={(theme) => ({
              item: {
                borderRadius: 3,
              },
            })}
            size="lg"
            total={table.getPageCount()}
            siblings={1}
            onChange={(page) => {
              table.setPageIndex(page - 1);
            }}
          />
        </Center>
      </Stack>
    </Container>
  );
};

export default Table;
