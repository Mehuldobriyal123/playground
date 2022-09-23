import * as React from 'react';
import {
  Aside as MantineAside,
  Text,
  Stack,
  TextInput,
  Group,
  Button,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import { openModal } from '@mantine/modals';
import { ArrowBackUp, Dots, RotateClockwise2, User } from 'tabler-icons-react';

import List from 'src/components/Checkout/List/List';

import DiscountModal from 'src/components/Modal/DiscountModal/DiscountModal';
import PromoModal from 'src/components/Modal/PromoModal/PromoModal';
import NoteModal from 'src/components/Modal/NoteModal/NoteModal';

const useStyles = createStyles((theme) => ({
  button: {
    height: 90,
    backgroundColor: theme.colors[theme.primaryColor][8],
    borderRadius: 3,
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    fontSize: 30,
    letterSpacing: '-.040em',
    textIndent: '-0.020em',
  },
  text: {
    letterSpacing: '-.016em',
  },
}));

const Aside = () => {
  const { classes } = useStyles();

  return (
    <MantineAside
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 600, md: 600 }}
    >
      <Stack spacing={20}>
        <Group position="apart">
          <Button leftIcon={<ArrowBackUp />} variant="default">
            Retrieve
          </Button>

          <Button leftIcon={<RotateClockwise2 />} variant="default">
            Park
          </Button>

          <Button leftIcon={<Dots />} variant="default">
            More
          </Button>
        </Group>

        <TextInput
          size="md"
          placeholder="Search customer"
          icon={<User size={14} />}
        />

        <List />

        <Group position="apart">
          <Text size="md" color="dimmed" weight={600}>
            Add
          </Text>

          <Group>
            <Button
              compact
              variant="default"
              onClick={() => {
                openModal({
                  children: <DiscountModal />,
                });
              }}
            >
              Discount
            </Button>
            <Button
              compact
              variant="default"
              onClick={() => {
                openModal({
                  children: <PromoModal />,
                });
              }}
            >
              Promo
            </Button>
            <Button
              compact
              variant="default"
              onClick={() => {
                openModal({
                  children: <NoteModal />,
                });
              }}
            >
              Note
            </Button>
          </Group>
        </Group>

        <Group position="apart">
          <Text size="md" color="dimmed" weight={600}>
            Discount
          </Text>
          <Text size="md" weight={500}>
            $0.00
          </Text>
        </Group>

        <Group position="apart">
          <Text size="md" color="dimmed" weight={600}>
            Subtotal
          </Text>
          <Text size="md" weight={500}>
            $286.35
          </Text>
        </Group>

        <UnstyledButton className={classes.button} p={20}>
          <Group position="apart">
            <Group>
              <Text className={classes.title} weight={700} color="white">
                PAY
              </Text>
              <Text className={classes.text} size="md" color="white">
                4 products
              </Text>
            </Group>

            <Text className={classes.title} weight={700} color="white">
              $286.25
            </Text>
          </Group>
        </UnstyledButton>
      </Stack>
    </MantineAside>
  );
};

export default Aside;
