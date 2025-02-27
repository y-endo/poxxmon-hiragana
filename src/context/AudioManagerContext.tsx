import { createContext, ReactNode, useMemo } from 'react';
import { AudioManager } from '@/utilities/AudioManager';

type AudioManagerContextType = AudioManager | null;

const AudioManagerContext = createContext<AudioManagerContextType>(null);

const AudioManagerProvider = ({ children }: { children: ReactNode }) => {
  const audioManager = useMemo(() => new AudioManager(), []);

  return (
    <AudioManagerContext.Provider value={audioManager}>
      {children}
    </AudioManagerContext.Provider>
  );
};

export { AudioManagerContext, AudioManagerProvider };
