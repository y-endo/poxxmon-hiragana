import {
  ReactNode,
  CSSProperties,
  ElementType,
  ComponentPropsWithoutRef,
} from 'react';
import clsx from 'clsx';

import styles from './style.module.scss';

type AsProps<E extends ElementType> = {
  as?: E;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<E>;

type FlexProps<E extends ElementType> = AsProps<E> & {
  inline?: boolean;
  direction?: CSSProperties['flexDirection'];
  wrap?: CSSProperties['flexWrap'];
  justifyItems?: CSSProperties['justifyItems'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  gap?: CSSProperties['gap'];
  columnGap?: CSSProperties['columnGap'];
  rowGap?: CSSProperties['rowGap'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  basis?: CSSProperties['flexBasis'];
};

export const Flex = <E extends ElementType>({
  inline = false,
  direction,
  wrap,
  justifyItems,
  justifyContent,
  alignItems,
  alignContent,
  gap,
  columnGap,
  rowGap,
  grow,
  shrink,
  basis,
  as,
  children,
  className,
  ...rest
}: FlexProps<E>) => {
  const Component = as || 'div';

  const classNames = clsx(
    styles.flex,
    {
      [styles.inline]: inline,
    },
    className
  );

  const style: CSSProperties = {
    flexDirection: direction,
    flexWrap: wrap,
    justifyItems,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    columnGap,
    rowGap,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
  };

  // styleのundefinedを削除
  Object.keys(style).forEach(
    key =>
      style[key as keyof CSSProperties] === undefined &&
      delete style[key as keyof CSSProperties]
  );

  return (
    <Component className={classNames} style={style} {...rest}>
      {children}
    </Component>
  );
};
