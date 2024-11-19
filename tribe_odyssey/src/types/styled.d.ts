import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    // Add any custom theme properties here
  }
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
} 