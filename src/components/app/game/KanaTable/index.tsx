import clsx from 'clsx';

import styles from './style.module.scss';

interface KanaTableProps {
  activeChar: string;
  handleInputChange: (value: string) => void;
  playInputSE: () => void;
}

const HiraganaBoard = [
  ['゛', 'ゃ', 'わ', 'ら', 'や', 'ま', 'は', 'な', 'た', 'さ', 'か', 'あ'],
  ['゜', 'ゅ', '', 'り', '', 'み', 'ひ', 'に', 'ち', 'し', 'き', 'い'],
  ['ー', 'ょ', 'を', 'る', 'ゆ', 'む', 'ふ', 'ぬ', 'つ', 'す', 'く', 'う'],
  ['', 'っ', '', 'れ', '', 'め', 'へ', 'ね', 'て', 'せ', 'け', 'え'],
  ['', '', 'ん', 'ろ', 'よ', 'も', 'ほ', 'の', 'と', 'そ', 'こ', 'お'],
];

export const KanaTable = ({
  activeChar,
  handleInputChange,
  playInputSE,
}: KanaTableProps) => {
  return (
    <div className={clsx(styles.root)}>
      {HiraganaBoard.map((row, rowIndex) => (
        <div key={rowIndex} className={clsx(styles.row)}>
          {row.map((kana, colIndex) => {
            return (
              <button
                type="button"
                key={colIndex}
                disabled={activeChar !== kana.trim()}
                className={clsx(styles.cell)}
                onClick={() => {
                  playInputSE();
                  handleInputChange(kana.trim());
                }}
              >
                {kana.trim()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
