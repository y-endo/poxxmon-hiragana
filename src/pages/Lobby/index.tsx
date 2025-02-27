import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/app/Layout';
import { Grid } from '@/components/common/Grid';
import { useDeviceMode } from '@/hooks/useDeviceMode';

import styles from './style.module.scss';

export const Lobby = () => {
  const isMobile = useDeviceMode();
  const panelList = [
    'あ',
    'か',
    'さ',
    'た',
    'な',
    'は',
    'ま',
    'や',
    'ら',
    'わ',
    'が',
    'ざ',
    'だ',
    'ば',
    'ぱ',
  ].map((initials, i) => {
    const id = String(i + 1).padStart(2, '0');
    return (
      <Link key={id} to={`/stage/${id}`} className={clsx(styles.panel)}>
        {initials}
      </Link>
    );
  });

  const gridProps = isMobile
    ? {
        columns: 'repeat(auto-fit, 90px)',
        gap: '20px',
        autoRows: '90px',
        alignContent: 'center',
        justifyContent: 'center',
      }
    : {
        columns: 'repeat(auto-fit, 200px)',
        gap: '20px',
        autoRows: '200px',
        alignContent: 'center',
        justifyContent: 'center',
      };

  return (
    <Layout>
      <Grid {...gridProps} className={clsx(styles.grid)}>
        {panelList}
      </Grid>
    </Layout>
  );
};
