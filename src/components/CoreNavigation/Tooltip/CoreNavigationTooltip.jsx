import React from 'react';
import glamorous from 'glamorous';

const CoreNavigationTooltip = ({
  className,
  children,
  visible = 0,
  position = 'middle',
  }: {
  className: string,
  children: string,
  visible: number,
  position: string,
}): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>);

const style = (props: {}, theme: THEME): {} => {
  const tooltipArrowSize = 10;
  const tooltipPosition = {};
  const tooltipCaretPosition = {};

  switch (props.position) {
    case 'top':
      tooltipPosition.top = 0;
      tooltipPosition.transform = `translateX(${props.visible * 10}px)`;

      tooltipCaretPosition.top = theme.spacing;
      tooltipCaretPosition.transform = 'rotate(45deg)';
      break;
    case 'middle':
      tooltipPosition.top = '50%';
      tooltipPosition.transform = `translateX(${props.visible * 10}px) translateY(-50%)`;

      tooltipCaretPosition.top = '50%';
      tooltipCaretPosition.transform = 'translateY(-50%) rotate(45deg)';
      break;
    case 'bottom':
      tooltipPosition.bottom = 0;
      tooltipPosition.top = 'auto';
      tooltipPosition.transform = `translateX(${props.visible * 10}px)`;

      tooltipCaretPosition.bottom = theme.spacing;
      tooltipCaretPosition.transform = 'rotate(45deg)';
      break;
    default:
      tooltipPosition.top = '50%';
      tooltipPosition.transform = `translateX(${props.visible * 10}px) translateY(-50%)`;

      tooltipCaretPosition.top = '50%';
      tooltipCaretPosition.transform = 'translateY(-50%) rotate(45deg)';
      break;
  }

  return {
    position: 'absolute',
    left: '100%',
    padding: theme.spacing / 2,
    borderRadius: 4,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
    transition: '.15s opacity ease, .3s transform ease',
    opacity: props.visible,
    pointerEvents: props.visible ? 'all' : 'none',
    background: theme.greys[90],
    color: theme.greys.white,
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
      left: tooltipArrowSize * -0.5,
      width: tooltipArrowSize,
      height: tooltipArrowSize,
      zIndex: -1,
      background: theme.greys[90],
      ...tooltipCaretPosition,
    },
  };
};

export default glamorous(CoreNavigationTooltip)(style);
