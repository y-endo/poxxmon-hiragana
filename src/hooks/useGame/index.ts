import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  AnimationEvent,
} from 'react';

import { convertHiraganaToVoicedSound } from '@/utilities/convertHiraganaToVoicedSound';
import { useSettings } from '@/hooks/useSettings';
import { useAudioManager } from '@/hooks/useAudioManager';
import { useImageLoader } from '@/hooks/useImageLoader';

import inputMp3 from '@/assets/audios/input.mp3';
import battleMp3 from '@/assets/audios/battle.mp3';
import winMp3 from '@/assets/audios/win.mp3';
import completeMp3 from '@/assets/audios/complete.mp3';

import enemyStyles from '@/components/app/game/Enemy/style.module.scss';
const HIDE_ANIMATION_NAME = enemyStyles.hide;

interface UseGameProps {
  images: string[];
  answers: string[];
}

export const useGame = ({ images, answers }: UseGameProps) => {
  const isUnmounting = useRef(false);
  const { state } = useSettings();
  const audioManager = useAudioManager();
  const imageLoader = useImageLoader();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [enemyState, setEnemyState] = useState<'show' | 'hide' | 'win'>('show');
  const [inputValue, setInputValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // 敵の表示
  const show = () => setEnemyState('show');

  // 敵の非表示
  const hide = () => setEnemyState('hide');

  // 敵を倒した
  const win = () => setEnemyState('win');

  // ゲームクリア
  const complete = useCallback(() => {
    audioManager.stop('battle');
    audioManager.seek('complete', 0.3);
    audioManager.play('complete');
    setIsComplete(true);
  }, [audioManager]);

  // 次の敵へ
  const next = useCallback(() => {
    if (currentEnemyIndex < images.length - 1) {
      setCurrentEnemyIndex(currentEnemyIndex + 1);
      setInputValue('');
      show();
    } else {
      complete();
    }
  }, [currentEnemyIndex, images.length, complete]);

  // 次に入力させる文字
  const activeChar = answers[currentEnemyIndex]
    ? answers[currentEnemyIndex][inputValue.length]
    : '';

  // inputValueの「゛」と「゜」を1つ前の文字と結合する
  const convertedValue = useCallback(() => {
    const valueArray = inputValue.split('');
    if (valueArray.length === 0) return '';

    let newValue = '';
    valueArray.forEach(char => {
      if (char === '゛' || char === '゜') {
        const convertedChar = convertHiraganaToVoicedSound(
          newValue.slice(-1),
          char
        );
        newValue = newValue.slice(0, -1);
        newValue += convertedChar;
      } else {
        newValue += char;
      }
    });

    return newValue;
  }, [inputValue]);

  // 入力された文字が正解と一致するか
  const isCorrect = useMemo(() => {
    return inputValue === answers[currentEnemyIndex];
  }, [inputValue, currentEnemyIndex, answers]);

  // 文字が入力されたときの処理
  const handleInputChange = (value: string) => {
    if (value === '') return;
    setInputValue(prev => prev + value);
  };

  // 次へ進むボタンが押されたときの処理
  const handleNextButtonClick = () => {
    hide();
  };

  // 敵のアニメーションが終わったときの処理
  const handleEnemyAnimationEnd = (event: AnimationEvent) => {
    if (event.animationName === HIDE_ANIMATION_NAME) {
      next();
    }
  };

  // ゲーム中のBGMを再生
  const playBattleBGM = useCallback(() => {
    audioManager.setLoop('battle', true);
    audioManager.seek('battle', 0.7);
    audioManager.play('battle');
  }, [audioManager]);

  // 文字入力のSEを再生
  const playInputSE = useCallback(() => {
    audioManager.seek('input', 0);
    setTimeout(() => {
      audioManager.play('input');
    }, 0);
  }, [audioManager]);

  // 敵を倒したときのSEを再生
  const playWinSE = useCallback(() => {
    audioManager.seek('win', 0);
    setTimeout(() => {
      audioManager.play('win');
    }, 100);
  }, [audioManager]);

  // アンマウント判定の設定
  // StrictModeを使うとダブルレンダリングが発生するため、依存関係がないuseEffectが2回実行される
  // 初回はマウント → アンマウント → マウントの順で実行される
  useEffect(() => {
    if (isUnmounting.current) {
      isUnmounting.current = false;
    }
    return () => {
      isUnmounting.current = true;
    };
  }, []);

  // 動画・音声ファイルの読み込み状態を確認
  useEffect(() => {
    if (!isLoaded) {
      audioManager.register('input', inputMp3);
      audioManager.register('battle', battleMp3);
      audioManager.register('win', winMp3);
      audioManager.register('complete', completeMp3);

      Promise.all([
        audioManager.load('input'),
        audioManager.load('battle'),
        audioManager.load('win'),
        audioManager.load('complete'),
        imageLoader.load(images),
      ]).then(() => {
        setIsLoaded(true);
      });
    }

    return () => {
      // アンマウントによるクリーンアップ時に、音声ファイルと画像ファイルを削除
      if (isLoaded && isUnmounting.current) {
        audioManager.stop('input');
        audioManager.stop('battle');
        audioManager.stop('win');
        audioManager.stop('complete');
        audioManager.delete('input');
        audioManager.delete('battle');
        audioManager.delete('win');
        audioManager.delete('complete');

        imageLoader.clearAll();
      }
    };
  }, [audioManager, imageLoader, images, isLoaded]);

  // 音声ファイルの音量を設定
  useEffect(() => {
    if (isLoaded) {
      audioManager.setVolume('input', state.isMute ? 0 : state.seVolume);
      audioManager.setVolume('battle', state.isMute ? 0 : state.bgmVolume);
      audioManager.setVolume('win', state.isMute ? 0 : state.seVolume);
      audioManager.setVolume('complete', state.isMute ? 0 : state.bgmVolume);
    }
  }, [state.isMute, state.seVolume, state.bgmVolume, audioManager, isLoaded]);

  // 入力文字が変更されるたびに正解かどうかを判定
  useEffect(() => {
    if (isCorrect && enemyState !== 'hide') {
      playWinSE();
      win();
    }
  }, [inputValue, isCorrect, enemyState, playWinSE]);

  return {
    isLoaded,
    currentEnemyIndex,
    enemyState,
    inputValue,
    activeChar,
    isComplete,
    playBattleBGM,
    playInputSE,
    convertedValue,
    show,
    hide,
    next,
    handleInputChange,
    handleNextButtonClick,
    handleEnemyAnimationEnd,
  };
};
