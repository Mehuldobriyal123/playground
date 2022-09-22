import * as React from 'react';
import { Accordion, ScrollArea } from '@mantine/core';

import ListItem from 'src/components/Checkout/ListItem/ListItem';

const List = () => {
  return (
    <ScrollArea style={{ height: '100%' }}>
      <Accordion>
        <ListItem value="nike" />
        <ListItem value="adidas" />
        <ListItem value="puma" />
      </Accordion>
    </ScrollArea>
  );
};

export default List;
