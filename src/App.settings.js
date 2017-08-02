export const APP_COLORS: {} = {
  primary: '#22205F',
  cobalt: '#3333FF',
  green: '#00CB98',
  yellow: '#FFFF98',
  warn: '#DE1A1A',
};

/*
  Acceptable gradients are:
  - primary -> cobalt
  - cobalt -> green
  - green -> yellow
*/

export const APP_GREYS: {} = {
  10: '#EFF1F5',
  20: '#DFE5EC',
  30: '#D0D9E5',
  40: '#C6D1E1',
  50: '#BBCADC',
  60: '#A1B3CA',
  70: '#8092B0',
  80: '#67809F',
  90: '#445873',
  100: '#2D3842',
  white: '#FFFFFF',
};

export const APP_FONTS: {} = {
  main: 'Montserrat',
  defaultSize: 13,
};

export const APP_SPACING: number = 16;

type MenuItem = {
  key: number,
  route: string,
  label: string,
};

export const MENU: Array<MenuItem> = [
  {
    key: 0,
    route: '/header',
    label: 'Data Entry',
  },
  {
    key: 1,
    route: '/header',
    label: 'Feedback',
  },
  {
    key: 2,
    route: '/header',
    label: 'Cards',
  },
];
