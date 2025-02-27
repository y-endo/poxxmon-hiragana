import clsx from 'clsx';
import { CSSProperties } from 'react';

import styles from './style.module.scss';

interface ImageProps {
  src: string;
  alt?: string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  fullWidth?: boolean;
  fullHeight?: boolean;
  inline?: boolean;
  className?: string;
}

export const Image = ({
  src,
  alt = '',
  width,
  height,
  fullWidth,
  fullHeight,
  inline,
  className,
}: ImageProps) => {
  const classNames = clsx(
    styles.image,
    {
      [styles['inline']]: inline,
      [styles['w-full']]: fullWidth,
      [styles['h-full']]: fullHeight,
    },
    className
  );
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classNames}
    />
  );
};
