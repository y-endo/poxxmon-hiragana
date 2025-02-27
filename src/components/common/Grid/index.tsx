import { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './style.module.scss';

interface GridProps {
  inline?: boolean;
  columns?: CSSProperties['gridTemplateColumns'];
  rows?: CSSProperties['gridTemplateRows'];
  gap?: CSSProperties['gap'];
  columnGap?: CSSProperties['columnGap'];
  rowGap?: CSSProperties['rowGap'];
  autoColumns?: CSSProperties['gridAutoColumns'];
  autoRows?: CSSProperties['gridAutoRows'];
  autoFlow?: CSSProperties['gridAutoFlow'];
  justifyItems?: CSSProperties['justifyItems'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  placeItems?: CSSProperties['placeItems'];
  placeContent?: CSSProperties['placeContent'];
  children: ReactNode;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  inline = false,
  columns,
  rows,
  gap,
  columnGap,
  rowGap,
  autoColumns,
  autoRows,
  autoFlow,
  justifyItems,
  justifyContent,
  alignItems,
  alignContent,
  placeItems,
  placeContent,
  children,
  className,
}) => {
  const classNames = clsx(
    styles.grid,
    {
      [styles.inline]: inline,
    },
    className
  );

  const style: CSSProperties = {
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap,
    columnGap,
    rowGap,
    gridAutoColumns: autoColumns,
    gridAutoRows: autoRows,
    gridAutoFlow: autoFlow,
    justifyItems,
    justifyContent,
    alignItems,
    alignContent,
    placeItems,
    placeContent,
  };

  // styleのundefinedを削除
  Object.keys(style).forEach(
    key =>
      style[key as keyof CSSProperties] === undefined &&
      delete style[key as keyof CSSProperties]
  );

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};
