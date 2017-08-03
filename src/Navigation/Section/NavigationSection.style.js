// @flow

export default (props: {}, theme: THEME): {} => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing,
  fontWeight: 'bold',
  cursor: 'pointer',
  background: `linear-gradient(135deg, ${theme.greys[30]} 0%, ${theme.greys[40]} 100%)`,
  color: theme.greys[100],

  ':hover': {
    background: `linear-gradient(135deg, ${theme.greys[50]} 0%, ${theme.greys[40]} 100%)`,
  },

  ':not(:last-child)': {
    marginBottom: 1,
  },
});
