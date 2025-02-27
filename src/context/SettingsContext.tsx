import { ReactNode, createContext, useReducer, Dispatch } from 'react';

type SettingsState = {
  isMute: boolean;
  bgmVolume: number;
  seVolume: number;
};

type SettingsAction =
  | { type: 'TOGGLE_MUTE' }
  | { type: 'CHANGE_BGM_VOLUME'; payload: number }
  | { type: 'CHANGE_SE_VOLUME'; payload: number };

const initialState: SettingsState = {
  isMute: false,
  bgmVolume: 0.1,
  seVolume: 0.3,
};

const settingsReducer = (
  state: SettingsState,
  action: SettingsAction
): SettingsState => {
  switch (action.type) {
    case 'TOGGLE_MUTE':
      return { ...state, isMute: !state.isMute };
    case 'CHANGE_BGM_VOLUME':
      return { ...state, bgmVolume: action.payload };
    case 'CHANGE_SE_VOLUME':
      return { ...state, seVolume: action.payload };
    default:
      return state;
  }
};

const SettingsContext = createContext<{
  state: SettingsState;
  dispatch: Dispatch<SettingsAction>;
} | null>(null);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
