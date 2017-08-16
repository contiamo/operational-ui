// @flow
import { hexOrColor, readableTextColor } from '../../utils/color';

type tooltipPosition = {
  top?: string | number,
  bottom?: string | number,
  transform?: string,
};

const getTooltipPosition = (anchor): tooltipPosition => {
  const position: tooltipPosition = {};
  switch (anchor) {
    case 'bottom':
      position.bottom = 0;
      break;
    default:
      position.top = '50%';
      position.transform = 'translateY(-50%)';
      break;
  }
  return position;
};

type caretPosition = {
  top?: string | number,
  bottom?: string | number,
  left?: number,
  transform?: string,
};

const getCaretPosition = (anchor: string) => (theme: THEME): caretPosition => {
  const size: number = 5;
  const caret: caretPosition = { left: size * -2, borderWidth: size };
  switch (anchor) {
    case 'bottom':
      caret.bottom = theme.spacing;
      break;
    case 'middle':
    default:
      caret.top = '50%';
      caret.transform = 'translateY(-50%)';
      break;
  }
  return caret;
};

export default ({
  theme,
  color,
  anchor,
}: {
  theme: THEME,
  color?: string,
  anchor?: string,
}): {} => {
  const backgroundColor: string = color
    ? hexOrColor(color)(theme.colors && theme.colors[color])
    : theme.greys && theme.greys['100'];

  return {
    position: 'absolute',
    ...getTooltipPosition(anchor),
    left: `calc(100% + ${theme.spacing || 0}px)`,
    zIndex: (theme.baseZIndex || 0) + 1000,
    width: 'fit-content',
    maxWidth: 200,
    opacity: 0, // Initially, they're hidden...
    transition: '.07s opacity ease', // ...for 0.07 seconds.
    padding: theme.spacing ? theme.spacing / 2 : 8,
    borderRadius: 4,
    wordWrap: 'break-word',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
    backgroundColor,
    color: readableTextColor(backgroundColor)(['black', 'white']),

    // This pseudo-element extends the clickable area of the far-away tooltip.
    '&::after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: theme.spacing && theme.spacing * -2,
      display: 'block',
      width: theme.spacing && theme.spacing * 2,
      height: '100%',
    },

    // They say behind every great tooltip is a great caret.
    '&::before': {
      content: "''",
      position: 'absolute',
      ...getCaretPosition(anchor || 'top')(theme),
      zIndex: (theme.baseZIndex || 0) * -1,
      width: 0,
      height: 0,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderRightColor: backgroundColor,
    },

    '&.active': {
      opacity: 1,
    },
  };
};
