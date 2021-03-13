import React from 'react';
import { Route } from 'react-router-dom';

import MainLayout from 'src/layouts/MainLayout';

const OpenRoute = ({ children, ...rest }) => {
  return <Route {...rest} render={() => <MainLayout>{children}</MainLayout>} />;
};

export default OpenRoute;
