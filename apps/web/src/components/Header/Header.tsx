import * as React from 'react';
import { Stack, Text, Title, createStyles, Group, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  title: {
    letterSpacing: '-.040em',
    textIndent: '-0.020em',
    fontWeight: 700,
  },
  text: {
    letterSpacing: '-.016em',
  },
  invalid: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors.red[8], 0.15)
        : theme.colors.red[0],
  },
  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },
}));

interface Props {
  title: string;
  text: string;
  showButton: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const Header = ({ title, text, showButton, buttonText, onClick }: Props) => {
  const { classes } = useStyles();

  return (
    <Group position="apart">
      <Stack spacing={5}>
        <Title className={classes.title} order={1}>
          {title}
        </Title>
        <Text className={classes.text} size="md">
          {text}
        </Text>
      </Stack>

      {showButton && (
        <Button variant="light" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </Group>
  );
};

export default Header;
