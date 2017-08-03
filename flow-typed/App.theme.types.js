// @flow
export type COLORS = {
  primary: string,
  accent?: string,
  secondary?: string,
  tertiary?: string,
  warn?: string,
};

export type GREYS = {
  '10': string,
  '20': string,
  '30': string,
  '40': string,
  '50': string,
  '60': string,
  '70': string,
  '80': string,
  '90': string,
  '100': string,
  white: string,
};

export type THEME = {
  colors: COLORS,
  greys: GREYS,
  gradients?: {},
  fonts: {
    main: string,
    defaultSize: number,
  },
  spacing: number,
};
