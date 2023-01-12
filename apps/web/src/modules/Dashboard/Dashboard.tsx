import * as React from 'react';
import { Container, Stack, Grid } from '@mantine/core';
import { usePreloadedQuery, PreloadedQuery } from 'react-relay';

import Header from 'src/components/Header/Header';
import StatItem from 'src/components/StatItem/StatItem';
import NotAuthenticated from 'src/components/Error/NotAuthenticated/NotAuthenticated';

import { MeQuery } from 'src/queries/';
import { MeQuery as MeQueryType } from 'src/queries/__generated__/MeQuery.graphql';

interface Props {
  queryReference: PreloadedQuery<MeQueryType>;
}

const Dashboard = ({ queryReference }: Props) => {
  const data = usePreloadedQuery<MeQueryType>(MeQuery, queryReference);

  if (!data.me) {
    return <NotAuthenticated />;
  }

  return (
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
};

export default Dashboard;
