import { Header } from '@components';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
