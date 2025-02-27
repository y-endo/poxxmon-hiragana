import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Flex } from '@/components/common/Flex';
import { Image } from '@/components/common/Image';
import { Button } from '@/components/common/Button';

import styles from './style.module.scss';

interface CompleteProps {
  images: string[];
  names: string[];
}

export const Complete = ({ images, names }: CompleteProps) => {
  // 名前の指定した位置の1文字を強調する
  const emphasizedNames = (name: string, position: number) => {
    return name.split('').map((char, index) => {
      if (index === position) {
        return (
          <span key={index} className={clsx(styles.emphasized)}>
            {char}
          </span>
        );
      }
      return char;
    });
  };

  return (
    <div>
      <div className={clsx(styles.enemies)}>
        {images.map((image, index) => {
          // 文字を強調する位置を指定
          let emphasizedPosition = 0;
          // 「ちをはうはね」の場合は2文字目を強調
          if (names[index] === 'ちをはうはね') {
            emphasizedPosition = 1;
          } else if (['でんぢむし', 'じおづむ'].includes(names[index])) {
            // 「でんぢむし」「じおずむ」の場合は3文字目を強調
            emphasizedPosition = 2;
          } else if (
            // 「あさなん」「おくたん」「わしぼん」「ろーぶしん」の場合は最後の文字を強調
            // わ行の「ん」で使うポケモンを決め打ちで適当に指定している
            ['あさなん', 'おくたん', 'わしぼん', 'ろーぶしん'].includes(
              names[index]
            )
          ) {
            emphasizedPosition = names[index].length - 1;
          }
          return (
            <div key={index} className={clsx(styles['enemies-item'])}>
              <Image src={image} />
              <p>{emphasizedNames(names[index], emphasizedPosition)}</p>
            </div>
          );
        })}
      </div>
      <Flex justifyContent="center" className={styles.back}>
        <Button as={Link} to="/lobby">
          もどる
        </Button>
      </Flex>
    </div>
  );
};
