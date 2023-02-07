import { createTheme } from '@mui/material';
import { overrides } from './overrides';
import { palette } from './palette';
import { typography } from './typography';

export const theme = createTheme({
  components: overrides,
  palette,
  typography
});