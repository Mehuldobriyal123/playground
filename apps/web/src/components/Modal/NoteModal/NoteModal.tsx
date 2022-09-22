import * as React from 'react';
import {
  Stack,
  Group,
  Button,
  Title,
  Text,
  Textarea,
  createStyles,
} from '@mantine/core';
import { closeAllModals } from '@mantine/modals';

const useStyles = createStyles((theme) => ({
  title: {
    letterSpacing: '-.040em',
    textIndent: '-0.020em',
  },
  text: {
    letterSpacing: '-.016em',
  },
}));

const NoteModal = () => {
  const { classes } = useStyles();

  return (
    <Stack spacing={20}>
      <Stack spacing={5}>
        <Title className={classes.title}>Add note</Title>
        <Text className={classes.text} size="md">
          You can add a note to this order
        </Text>
      </Stack>

      <Textarea placeholder="Your note" label="Your note" />

      <Group position="right">
        <Button variant="default" onClick={() => closeAllModals()}>
          Cancel
        </Button>

        <Button variant="filled" onClick={() => closeAllModals()}>
          Add
        </Button>
      </Group>
    </Stack>
  );
};

export default NoteModal;
