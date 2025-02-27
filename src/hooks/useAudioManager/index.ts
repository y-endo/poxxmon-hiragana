import { useContext } from 'react';
import { AudioManagerContext } from '@/context/AudioManagerContext';
import { AudioManager } from '@/utilities/AudioManager';

export const useAudioManager = (): AudioManager => {
  const context = useContext(AudioManagerContext);
  if (!context) {
    throw new Error(
      'useAudioManager must be used within a AudioManagerProvider'
    );
  }
  return context;
};
