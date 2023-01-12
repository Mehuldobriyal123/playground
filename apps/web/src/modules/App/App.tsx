import * as React from 'react';
import { ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';

import Home from 'src/modules/Home/Home';

import SignIn from 'src/modules/Auth/SignIn/SignIn';
import SignUp from 'src/modules/Auth/SignUp/SignUp';
import ForgotPassword from 'src/modules/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from 'src/modules/Auth/ResetPassword/ResetPassword';

const App = () => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Inter:300,400,500,600,700,800,900',
          'Lexend:100,200,300,400,500,600,700,800,900',
          'DM+Sans:400,500,700',
        ],
      },
    });
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Routes>
        <Route path="*" element={<Home />} />

        <Route path="/signin/*" element={<SignIn />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/forgot/*" element={<ForgotPassword />} />
        <Route path="/reset/*" element={<ResetPassword />} />
      </Routes>
    </ColorSchemeProvider>
  );
};

export default App;
