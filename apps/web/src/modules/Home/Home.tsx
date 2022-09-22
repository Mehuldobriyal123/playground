import * as React from 'react';
import { AppShell } from '@mantine/core';
import { Routes, Route, useLocation } from 'react-router-dom';

import NavBar from 'src/components/AppShell/NavBar/NavBar';
import Header from 'src/components/AppShell/Header/Header';
import Aside from 'src/components/AppShell/Aside/Aside';

import Checkout from 'src/modules/Checkout/Checkout';
import Customers from 'src/modules/Customers/Customers';
import Dashboard from 'src/modules/Dashboard/Dashboard';
import Products from 'src/modules/Products/Products';
import Sales from 'src/modules/Sales/Sales';
import Sellers from 'src/modules/Sellers/Sellers';
import Setup from 'src/modules/Setup/Setup';
import Suppliers from 'src/modules/Suppliers/Suppliers';

const Home = () => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const location = useLocation();

  const isCheckout = location.pathname === '/checkout';

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      aside={isCheckout ? <Aside /> : undefined}
      navbar={<NavBar opened={!opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="sales" element={<Sales />} />
        <Route path="sellers" element={<Sellers />} />
        <Route path="setup" element={<Setup />} />
        <Route path="suppliers" element={<Suppliers />} />
      </Routes>
    </AppShell>
  );
};

export default Home;
