import clsx from 'clsx';
import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import styles from './style.module.scss';

type AsProps<E extends ElementType> = {
  as?: E;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<E>;

type ButtonProps<E extends ElementType> = AsProps<E> &
  (E extends typeof Link ? LinkProps : object);

export const Button = <E extends ElementType = 'button'>({
  as,
  children,
  className,
  ...rest
}: ButtonProps<E>) => {
  const Component = as || 'button';

  return (
    <Component className={clsx(styles.button, className)} {...rest}>
      {children}
    </Component>
  );
};
