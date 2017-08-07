// @flow
import { hexOrColor, readableTextColor } from '../../../utils/color';

export default ({
  theme,
  position,
  color,
}: {
  theme: THEME,
  position?: string,
  color?: string,
}): {} => {
  const tooltipCaretSize = 10;
  const tooltipPosition = {};
  const tooltipCaretPosition = {};
  const backgroundColor = color
    ? hexOrColor(color)(theme.colors[color])
    : theme.greys && theme.greys['100'];

  // Where do we put the caret and anchor the tooltip?
  switch (position) {
    case 'bottom':
      tooltipPosition.bottom = 0;
      tooltipPosition.transform = 'translateX(var(--offsetLeft))';

      tooltipCaretPosition.bottom = theme.spacing;
      tooltipCaretPosition.transform = 'rotate(45deg)';
      break;
    default:
      tooltipPosition.top = '50%';
      tooltipPosition.transform = 'translateX(var(--offsetLeft)) translateY(-50%)';

      tooltipCaretPosition.top = '50%';
      tooltipCaretPosition.transform = 'translateY(-50%) rotate(45deg)';
      break;
  }

  return {
    '--offsetLeft': '-10px',

    position: 'absolute',
    left: `calc(100% + ${theme.spacing / 2}px)`,
    padding: (theme.spacing || 16) / 2,
    borderRadius: 4,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
    transition: '.15s opacity ease, .3s transform ease',
    opacity: 0,
    pointerEvents: 'none',
    backgroundColor,
    color: readableTextColor(backgroundColor)(['black', 'white']),
    ...tooltipPosition,

    // This pseudo-friend extends the clickable area of the far-away tooltip.
    '&::after': {
      content: "''",
      position: 'absolute',
      left: '-100%',
      top: 0,
      display: 'block',
      width: '100%',
      height: '100%',
    },

    '&::before': {
      content: "''",
      position: 'absolute',
      left: tooltipCaretSize * -0.5,
      width: tooltipCaretSize,
      height: tooltipCaretSize,
      zIndex: 0,
      background: 'inherit',
      ...tooltipCaretPosition,
    },
  };
};
