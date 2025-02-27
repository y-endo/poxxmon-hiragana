import { MouseEvent, useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Image } from '@/components/common/Image';
import { Flex } from '@/components/common/Flex';
import { isIOS } from '@/utilities/isIOS';

import settingIcon from '@/assets/images/common/icon-setting.svg';
import closeIcon from '@/assets/images/common/icon-close.svg';

import styles from './style.module.scss';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useSettings();

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
      >
        <Image src={isOpen ? closeIcon : settingIcon} />
      </button>
      {isOpen && (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          onClick={() => setIsOpen(!isOpen)}
          className={styles.menu}
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            rowGap={'20px'}
            className={styles['menu-content']}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          >
            <Flex as="label" alignItems="center" className={styles.label}>
              <span className={styles['label-text']}>ミュート</span>
              <Flex justifyContent="center" grow="1">
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={state.isMute}
                    onChange={() => dispatch({ type: 'TOGGLE_MUTE' })}
                  />
                </div>
              </Flex>
            </Flex>
            {!isIOS() && (
              <Flex as="label" alignItems="center" className={styles.label}>
                <span className={styles['label-text']}>背景音</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={state.bgmVolume}
                  onChange={e =>
                    dispatch({
                      type: 'CHANGE_BGM_VOLUME',
                      payload: Number(e.target.value),
                    })
                  }
                  className={styles.range}
                />
              </Flex>
            )}
            {!isIOS() && (
              <Flex as="label" alignItems="center" className={styles.label}>
                <span className={styles['label-text']}>効果音</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={state.seVolume}
                  onChange={e =>
                    dispatch({
                      type: 'CHANGE_SE_VOLUME',
                      payload: Number(e.target.value),
                    })
                  }
                  className={styles.range}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
