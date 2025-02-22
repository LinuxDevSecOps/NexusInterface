import path from 'path';
import { walletDataDir, fileExists } from 'consts/paths';
import { readJson, writeJson } from 'utils/json';

const themeFileName = 'theme.json';
const themeFilePath = path.join(walletDataDir, themeFileName);

export const defaultTheme = {
  defaultStyle: 'Dark',
  wallpaper: null,
  background: '#1c1d1f',
  foreground: '#ebebe6',
  primary: '#00b7fa',
  primaryAccent: '#ffffff',
  danger: '#8f240e',
  dangerAccent: '#ffffff',
  globeColor: '#0097e4',
  globePillarColor: '#00ffff',
  globeArchColor: '#00ffff',
};

function readTheme() {
  if (fileExists(themeFilePath)) {
    return readJson(themeFilePath);
  } else {
    return defaultTheme;
  }
}

function writeTheme(theme) {
  return writeJson(themeFilePath, filterValidTheme(theme));
}

export function filterValidTheme(theme) {
  const validTheme = {};
  Object.keys(theme || {}).map(key => {
    if (defaultTheme.hasOwnProperty(key)) {
      validTheme[key] = theme[key];
    } else {
      console.error(`Invalid theme propery \`${key}\``);
    }
  });
  return validTheme;
}

export function LoadTheme() {
  const customTheme = readTheme();
  return { ...defaultTheme, ...customTheme };
}

export function UpdateTheme(updates) {
  const theme = readTheme();
  return writeTheme({ ...theme, ...updates });
}

export function ResetColors() {
  const theme = readTheme();
  const newTheme = {};
  if (theme.wallpaper) newTheme.wallpaper = theme.wallpaper;
  return writeTheme(newTheme);
}
