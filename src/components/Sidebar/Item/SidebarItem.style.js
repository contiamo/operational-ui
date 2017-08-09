// @flow
import { css } from 'glamor';
import { TOOLTIP_CONTAINER_STYLE } from '../../Tooltip/Tooltip';

export default ({ theme, children }: { theme: THEME, children: mixed }): {} => {
  const spin: string = css.keyframes({
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359deg)',
    },
  });

  const caret: {} = children
    ? {
      '> .header::after': {
        content: "''",
        position: 'absolute',
        top: 12,
        right: theme.spacing / 2,
        display: 'block',
        width: 0,
        height: 0,
        border: '4px solid transparent',
        borderLeftColor: theme.greys && theme.greys['30'],
        transition: '.15s transform ease',
      },
    }
    : {};

  return {
    '> .header': {
      position: 'relative',
      padding: theme.spacing / 2,
      paddingRight: theme.spacing,
      cursor: 'pointer',
      borderTop: `1px solid ${theme.greys && theme.greys['20']}`,
    },

    '> .header:hover': {
      backgroundColor: theme.greys && theme.greys['10'],
    },

    '&.open > .header': {
      borderBottom: `1px solid ${theme.greys && theme.greys['30']}`,
    },

    '&.open > .header::after': {
      transform: 'translateX(-2px) rotate(90deg)',
    },

    '&.updating > .header::after': {
      top: 9,
      width: 16,
      height: 16,
      borderRadius: '50%',
      boxShadow: `1px 0px 0px 0px ${theme.greys && theme.greys['70']} inset`,
      animation: `.7s ${spin} linear infinite`,
      border: 0,
    },

    '& .content': {
      position: 'relative',
      paddingLeft: theme.spacing,
    },

    '& .content::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'block',
      width: theme.spacing,
      height: '100%',
      borderRight: `1px solid ${theme.greys && theme.greys['30']}`,
      backgroundColor: theme.greys && theme.greys['10'],
    },

    ...caret,
    ':hover > .tooltip': {
      ...TOOLTIP_CONTAINER_STYLE,
    },
  };
};
