/**
 * hiraganaで受け取ったひらがなに濁音・半濁音を追加して返す
 * @param hiragana 濁音・半濁音を追加したいひらがな
 * @param mark 濁音の場合は'゛'、半濁音の場合は'゜'
 * @returns 濁音・半濁音を追加したひらがな
 */
export const convertHiraganaToVoicedSound = (
  hiragana: string,
  mark: '゛' | '゜'
): string => {
  const voicedSoundMap: { [key: string]: string } = {
    か: 'が',
    き: 'ぎ',
    く: 'ぐ',
    け: 'げ',
    こ: 'ご',
    さ: 'ざ',
    し: 'じ',
    す: 'ず',
    せ: 'ぜ',
    そ: 'ぞ',
    た: 'だ',
    ち: 'ぢ',
    つ: 'づ',
    て: 'で',
    と: 'ど',
    は: 'ば',
    ひ: 'び',
    ふ: 'ぶ',
    へ: 'べ',
    ほ: 'ぼ',
  };

  const semiVoicedSoundMap: { [key: string]: string } = {
    は: 'ぱ',
    ひ: 'ぴ',
    ふ: 'ぷ',
    へ: 'ぺ',
    ほ: 'ぽ',
  };

  if (mark === '゛') {
    return voicedSoundMap[hiragana] || hiragana;
  } else if (mark === '゜') {
    return semiVoicedSoundMap[hiragana] || hiragana;
  }

  return hiragana;
};
