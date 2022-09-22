import React from 'react';
import { createStyles, Group, Paper, Text } from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface StatsGridProps {
  title: string;
  value: string;
  diff: number;
}

const StatItem = ({ title, value, diff }: StatsGridProps) => {
  const { classes } = useStyles();

  return (
    <Paper withBorder p="md" key={title}>
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
        </Text>
        <UserPlus className={classes.icon} size={22} />
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value}>{value}</Text>
        <Text
          color={diff > 0 ? 'teal' : 'red'}
          size="sm"
          weight={500}
          className={classes.diff}
        >
          <span>{diff}%</span>
          <UserPlus size={16} />
        </Text>
      </Group>

      <Text size="xs" color="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Paper>
  );
};

export default StatItem;
