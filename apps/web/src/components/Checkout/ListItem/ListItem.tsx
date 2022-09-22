import * as React from 'react';
import {
  Group,
  Text,
  Stack,
  Accordion,
  SimpleGrid,
  TextInput,
  Textarea,
  NumberInput,
} from '@mantine/core';

interface Props {
  value: string;
}

const ListItem = ({ value }: Props) => {
  return (
    <Accordion.Item value={value}>
      <Accordion.Control>
        <Group position="apart">
          <Group spacing="md">
            <Text size="md" weight={700}>
              1
            </Text>

            <Stack spacing={1}>
              <Text size="md" weight={600}>
                Tênis Nike Air Force
              </Text>
              <Text size="sm">42, Preto</Text>
            </Stack>
          </Group>
          <Text size="md" weight={700}>
            $99.99
          </Text>
        </Group>
      </Accordion.Control>

      <Accordion.Panel>
        <Stack spacing={20}>
          <SimpleGrid cols={3}>
            <NumberInput
              defaultValue={1}
              size="sm"
              placeholder="Change quantity"
              label="Quantity"
            />

            <TextInput size="sm" placeholder="Price" label="Change price" />

            <TextInput size="sm" placeholder="Discount" label="Change" />
          </SimpleGrid>

          <Textarea
            size="sm"
            placeholder="Add a note"
            label="Note"
            description="You can add a note to this product"
            autosize
            minRows={2}
            maxRows={5}
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default ListItem;
