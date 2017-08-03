// @flow
const THEME_COLORS: COLORS = {
  primary: '#22205F',
  accent: '#3333FF',
  secondary: '#00CB98',
  tertiary: '#FFFF98',
  warn: '#DE1A1A',
};

const THEME_GREYS: GREYS = {
  "10": '#EFF1F5',
  "20": '#DFE5EC',
  "30": '#D0D9E5',
  "40": '#C6D1E1',
  "50": '#BBCADC',
  "60": '#A1B3CA',
  "70": '#8092B0',
  "80": '#67809F',
  "90": '#445873',
  "100": '#2D3842',
  white: '#FFFFFF',
};

const DEFAULT_THEME: THEME = {
  colors: THEME_COLORS,
  greys: THEME_GREYS,
  fonts: {
    main: 'Montserrat',
    defaultSize: 13,
  },
  spacing: 16,
};

// Specific gradient creation for Contiamo, according to the style guide.
if (THEME_COLORS.accent) {
  DEFAULT_THEME.gradients = {
    ...DEFAULT_THEME.gradients,
    primaryToAccent: {
      backgroundImage: `linear-gradient(135deg, ${THEME_COLORS.primary} 0%, ${THEME_COLORS.accent} 100%)`,
    },
  };
}

if (THEME_COLORS.accent && THEME_COLORS.secondary) {
  DEFAULT_THEME.gradients = {
    ...DEFAULT_THEME.gradients,
    accentToSecondary: {
      backgroundImage: `linear-gradient(135deg, ${THEME_COLORS.accent} 0%, ${THEME_COLORS.secondary} 100%)`,
    },
  };
}

if (THEME_COLORS.secondary && THEME_COLORS.tertiary) {
  DEFAULT_THEME.gradients = {
    ...DEFAULT_THEME.gradients,
    secondaryToTertiary: {
      backgroundImage: `linear-gradient(135deg, ${THEME_COLORS.secondary} 0%, ${THEME_COLORS.tertiary} 100%)`,
    },
  };
}

export default DEFAULT_THEME;
