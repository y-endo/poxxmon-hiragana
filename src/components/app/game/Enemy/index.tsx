import clsx from 'clsx';
import { Image } from '@/components/common/Image';
import { AnimationEvent } from 'react';

import styles from './style.module.scss';

interface EnemyProps {
  images: string[];
  currentIndex: number;
  handleAnimationEnd: (event: AnimationEvent) => void;
  state?: string;
}

export const Enemy = ({
  images,
  currentIndex,
  handleAnimationEnd,
  state,
}: EnemyProps) => {
  const classNames = clsx(styles.root, {
    [styles.show]: state === 'show',
    [styles.hide]: state === 'hide',
    [styles.win]: state === 'win',
  });

  return (
    <div className={classNames} onAnimationEnd={handleAnimationEnd}>
      <Image src={images[currentIndex]} />
    </div>
  );
};
