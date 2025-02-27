import { createContext, ReactNode, useMemo } from 'react';
import { ImageLoader } from '@/utilities/ImageLoader';

type ImageLoaderContextType = ImageLoader | null;

const ImageLoaderContext = createContext<ImageLoaderContextType>(null);

const ImageLoaderProvider = ({ children }: { children: ReactNode }) => {
  const imageLoader = useMemo(() => new ImageLoader(), []);

  return (
    <ImageLoaderContext.Provider value={imageLoader}>
      {children}
    </ImageLoaderContext.Provider>
  );
};

export { ImageLoaderContext, ImageLoaderProvider };
