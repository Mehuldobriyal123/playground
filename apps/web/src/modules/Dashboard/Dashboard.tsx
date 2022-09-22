import * as React from 'react';
import { Container, Stack, Grid } from '@mantine/core';

import Header from 'src/components/Header/Header';
import StatItem from 'src/components/StatItem/StatItem';

const Dashboard = () => (
  <Container>
    <Stack spacing={20}>
      <Header
        title="Welcome, Leo"
        text="Here are some stats about your store"
        showButton={true}
        buttonText="Add customer"
        onClick={() => console.log('clicked!')}
      />

      <Grid>
        <Grid.Col span={4}>
          <StatItem title="Revenue" value="13456" diff={23} />
        </Grid.Col>

        <Grid.Col span={4}>
          <StatItem title="Revenue" value="13456" diff={23} />
        </Grid.Col>

        <Grid.Col span={4}>
          <StatItem title="Revenue" value="13456" diff={23} />
        </Grid.Col>

        <Grid.Col span={4}>
          <StatItem title="Revenue" value="13456" diff={23} />
        </Grid.Col>
      </Grid>
    </Stack>
  </Container>
);

export default Dashboard;
