import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useZukanImages } from '@/hooks/useZukanImages';
import { ENEMIES } from '@/constants';
import { Layout } from '@/components/app/Layout';
import { Flex } from '@/components/common/Flex';
import { Button } from '@/components/common/Button';
import { Enemy } from '@/components/app/game/Enemy';
import { InputField } from '@/components/app/game/InputField';
import { KanaTable } from '@/components/app/game/KanaTable';
import { Complete } from '@/components/app/game/Complete';
import { useGame } from '@/hooks/useGame';
import { getRandomInt } from '@/utilities/getRandomInt';

import styles from './style.module.scss';

export const Stage = () => {
  const { id } = useParams<{ id: string }>();

  const enemyData = useMemo(
    () =>
      id ? ENEMIES[id].map(row => row[getRandomInt(0, row.length - 1)]) : [],
    [id]
  );

  const imageIds = useMemo(
    () => (id ? enemyData.map(enemy => enemy.id) : []),
    [id, enemyData]
  );

  const zukanImages = useZukanImages(imageIds);
  const images = useMemo(() => zukanImages, [zukanImages]);

  const names = useMemo(
    () => (id ? enemyData.map(enemy => enemy.name) : []),
    [id, enemyData]
  );

  const inputNames = useMemo(
    () => (id ? enemyData.map(enemy => enemy.inputName) : []),
    [id, enemyData]
  );

  const {
    isLoaded,
    currentEnemyIndex,
    enemyState,
    activeChar,
    isComplete,
    playBattleBGM,
    playInputSE,
    convertedValue,
    handleInputChange,
    handleNextButtonClick,
    handleEnemyAnimationEnd,
  } = useGame({
    images,
    answers: inputNames,
  });

  // 戦闘BGMを再生
  useEffect(() => {
    if (isLoaded) {
      playBattleBGM();
    }
  }, [playBattleBGM, isLoaded]);

  // ローディング画面を表示
  if (!isLoaded) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={styles.loading}
      >
        <p>よみこみちゅう</p>
      </Flex>
    );
  }

  // ゲームをクリアしている場合はCompleteコンポーネントを表示
  if (isComplete) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={clsx(styles.container, {
          [styles['is-complete']]: isComplete,
        })}
      >
        <Complete images={images} names={names} />
      </Flex>
    );
  }

  // ゲーム画面を表示
  return (
    <Layout>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
        className={styles.container}
      >
        <Enemy
          images={images}
          currentIndex={currentEnemyIndex}
          handleAnimationEnd={handleEnemyAnimationEnd}
          state={enemyState}
        />
        <InputField
          value={convertedValue()}
          isFilled={enemyState === 'win'}
          handleNextButtonClick={handleNextButtonClick}
        />
        <KanaTable
          activeChar={activeChar}
          handleInputChange={handleInputChange}
          playInputSE={playInputSE}
        />
      </Flex>
      <Button as={Link} to="/lobby" className={styles.back}>
        もどる
      </Button>
    </Layout>
  );
};
