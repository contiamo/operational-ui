/** @flow

  Strongly type the themes in order to create a relatable theming API since our apps rely on properties such as theme.colors.primary, theme.fonts.main, etc. throughout the app.

  We really want these properties to be defined and valid. :)
*/

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
    fontFamily: string,
    fontSize: number,
    WebkitFontSmoothing?: string,
    textRendering?: string,
  },
  spacing: number,
  baseZIndex: number,
};
