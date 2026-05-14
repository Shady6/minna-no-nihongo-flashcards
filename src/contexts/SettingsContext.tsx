import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type SettingsContextType = {
  audioEnabled: boolean;
  setAudioEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [audioEnabled, setAudioEnabled] = useState(
    () => localStorage.getItem("audioEnabled") !== "false",
  );

  useEffect(() => {
    localStorage.setItem("audioEnabled", String(audioEnabled));
  }, [audioEnabled]);

  return (
    <SettingsContext.Provider value={{ audioEnabled, setAudioEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
};
