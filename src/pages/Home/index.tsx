import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/app/Layout';
import { Flex } from '@/components/common/Flex';
import { Image } from '@/components/common/Image';

import logoSvg from '@/assets/images/common/logo.svg';

import styles from './style.module.scss';

export const Home = () => {
  return (
    <Layout>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={styles.container}
      >
        <h1 className={clsx(styles.title)}>
          <Image src={logoSvg} alt="ポケモンずかん" />
        </h1>
        <p className={clsx(styles.subtitle)}>ひらがなゲーム！</p>
        <Link to="/lobby" className={clsx(styles.button)}>
          あそぶ
        </Link>
      </Flex>
    </Layout>
  );
};
