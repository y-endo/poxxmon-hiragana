import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './style.module.scss';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={clsx(styles.container)}>{children}</div>;
};
