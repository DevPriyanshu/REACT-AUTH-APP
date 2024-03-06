import { ChangeEvent, createContext, ReactNode } from "react";

// theme
import palette from "../theme/palette";
// hooks
import { useLocalStorage } from "../hooks/useLocalStorage";

export type ThemeMode = "light" | "dark";
export type ThemeDirection = "rtl" | "ltr";
export type ThemeColor =
  | "default"
  | "purple"
  | "cyan"
  | "green"
  | "orange"
  | "pink";

export type SettingsContextProps = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
  themeColor: ThemeColor;
  themeStretch: boolean;
  setColor: {
    name: string;
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  };
  colorOption: {
    name: string;
    value: string;
  }[];
  onChangeMode: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeDirection: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeColor: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleStretch: VoidFunction;
};

const PRIMARY_COLOR = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // CYAN
  {
    name: "cyan",
    lighter: "#D1FFFC",
    light: "#76F2FF",
    main: "#1CCAFF",
    dark: "#0E77B7",
    darker: "#053D7A",
    contrastText: palette.light.grey[800],
  },
  // GREEN
  {
    name: "green",
    lighter: "#C8FACD",
    light: "#5BE584",
    main: "#00AB55",
    dark: "#007B55",
    darker: "#005249",
    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // PINK
  {
    name: "pink",
    lighter: "#f2bbe8",
    light: "#e8bee0",
    main: "#f505c9",
    dark: "#42273d",
    darker: "#291625",
    contrastText: palette.light.grey[800],
  },
];

function SetColor(themeColor: ThemeColor) {
  let color;
  const DEFAULT = PRIMARY_COLOR[0];
  const PURPLE = PRIMARY_COLOR[1];
  const CYAN = PRIMARY_COLOR[2];
  const GREEN = PRIMARY_COLOR[3];
  const ORANGE = PRIMARY_COLOR[4];
  const PINK = PRIMARY_COLOR[5];

  switch (themeColor) {
    case "purple":
      color = PURPLE;
      break;
    case "cyan":
      color = CYAN;
      break;
    case "green":
      color = GREEN;
      break;
    case "orange":
      color = ORANGE;
      break;
    case "pink":
      color = PINK;
      break;
    default:
      color = DEFAULT;
  }
  return color;
}

const initialState: SettingsContextProps = {
  themeMode: "light",
  themeDirection: "ltr",
  themeColor: "default",
  themeStretch: false,
  onChangeMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  onToggleStretch: () => {},
  setColor: PRIMARY_COLOR[0],
  colorOption: [],
};

const SettingsContext = createContext(initialState);

type SettingsProviderProps = {
  children: ReactNode;
};

function SettingsProvider({ children }: Readonly<SettingsProviderProps>) {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeMode: "light",
    themeDirection: "ltr",
    themeColor: "default",
    themeStretch: false,
  });

  const onChangeMode = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as ThemeMode,
    });
  };

  const onChangeDirection = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeDirection: (event.target as HTMLInputElement)
        .value as ThemeDirection,
    });
  };

  const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeColor: (event.target as HTMLInputElement).value as ThemeColor,
    });
  };

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColor: SetColor(settings.themeColor),
        colorOption: PRIMARY_COLOR.map((color) => ({
          name: color.name,
          value: color.main,
        })),
        // Stretch
        onToggleStretch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext, SettingsProvider };
