import clsx from 'clsx';

import styles from './style.module.scss';

interface InputFieldProps {
  value: string;
  isFilled: boolean;
  handleNextButtonClick: () => void;
}

export const InputField = ({
  value,
  isFilled,
  handleNextButtonClick,
}: InputFieldProps) => {
  const rootClassNames = clsx(styles.root, {
    [styles['is-filled']]: isFilled,
  });

  return (
    <div className={rootClassNames}>
      <div className={clsx(styles.balloon)}>なんてよむかな？</div>
      <input
        type="text"
        value={value}
        readOnly
        className={clsx(styles.input)}
      />
      <button
        type="button"
        className={clsx(styles.next)}
        onClick={handleNextButtonClick}
      >
        よめた！
      </button>
    </div>
  );
};
