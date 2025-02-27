import { useState, useEffect, useMemo } from 'react';

// メディアクエリのブレークポイント
const MOBILE_BREAKPOINT = 768;

// カスタムフック
export const useDeviceMode = () => {
  // SP モードなら true, PC モードなら false
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(width <= ${MOBILE_BREAKPOINT}px)`).matches
  );

  // メディアクエリをメモ化して再レンダリングを抑える
  const mediaQuery = useMemo(
    () => window.matchMedia(`(width <= ${MOBILE_BREAKPOINT}px)`),
    []
  );

  useEffect(() => {
    // メディアクエリのコールバック関数
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // リスナーを追加
    mediaQuery.addEventListener('change', handleChange);

    // 初期判定
    setIsMobile(mediaQuery.matches);

    // クリーンアップ関数でリスナーを削除
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mediaQuery]);

  return isMobile;
};
