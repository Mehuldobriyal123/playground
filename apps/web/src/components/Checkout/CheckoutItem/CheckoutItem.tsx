import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Stack,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    border: `1px solid ${theme.colors.gray[3]}`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${theme.colors[theme.primaryColor][7]}`,
    },
    '&:focus': {
      cursor: 'pointer',
      border: `1px solid ${theme.colors[theme.primaryColor][7]}`,
    },
  },

  imageSection: {
    height: 150,
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },

  text: {
    textAlign: 'start',
  },
}));

const CheckoutItem = () => {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.card} component="button">
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      <Group mt="md">
        <Stack spacing={0}>
          <Text className={classes.text} weight={600}>
            Tesla Model S
          </Text>
          <Text size="sm" color="dimmed">
            Free recharge at any station
          </Text>
        </Stack>
        <Badge color="violet">Badge</Badge>
      </Group>

      <Card.Section mt="md" className={classes.section}>
        <Group position="apart">
          <div>
            <Text
              size="xl"
              weight={700}
              sx={{ lineHeight: 1, textAlign: 'start' }}
            >
              $168.00
            </Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default CheckoutItem;
