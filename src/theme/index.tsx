import { ReactNode, useMemo } from 'react';
import {
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
  createTheme
} from '@mui/material/styles';
import shadows, { customShadows } from './shadows';

// material
import { CssBaseline } from '@mui/material';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import palette from './palette';
//
import shape from './shape';
import typography from './typography';
// hooks
import useSettings from '../hooks/useSettings';

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
