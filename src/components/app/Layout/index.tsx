import clsx from 'clsx';
import { ReactNode } from 'react';
import { Menu } from '@/components/app/Menu';
import { Container } from '@/components/common/Container';

import styles from './style.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        <Menu />
      </header>
      <main className={clsx(styles.main)}>
        <Container>{children}</Container>
      </main>
    </>
  );
};
