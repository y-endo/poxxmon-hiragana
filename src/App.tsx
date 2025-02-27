import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { SettingsProvider } from '@/context/SettingsContext';
import { AudioManagerProvider } from '@/context/AudioManagerContext';
import { ImageLoaderProvider } from './context/ImageLoaderContext';

import '@/styles/base.scss';

function App() {
  return (
    <SettingsProvider>
      <AudioManagerProvider>
        <ImageLoaderProvider>
          <RouterProvider router={router} />
        </ImageLoaderProvider>
      </AudioManagerProvider>
    </SettingsProvider>
  );
}

export default App;
