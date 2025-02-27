const allImages = import.meta.glob<Record<string, { default: string }>>(
  '../../assets/images/zukan/*.webp',
  {
    eager: true,
  }
);

export const useZukanImages = (ids: string[]): string[] => {
  const images = ids.map(
    id =>
      allImages[`../../assets/images/zukan/${id}.webp`]
        ?.default as unknown as string
  );

  return images;
};
