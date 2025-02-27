import { useContext } from 'react';
import { ImageLoaderContext } from '@/context/ImageLoaderContext';
import { ImageLoader } from '@/utilities/ImageLoader';

export const useImageLoader = (): ImageLoader => {
  const context = useContext(ImageLoaderContext);
  if (!context) {
    throw new Error('useImageLoader must be used within a ImageLoaderProvider');
  }
  return context;
};
