import React from 'react';
import glamorous from 'glamorous';
import GoX from 'react-icons/lib/go/x';

import { hexOrColor, readableTextColor } from '../../utils/color';

const Chip = ({
  className,
  children,
  onClick,
  symbol,
}: {
  className?: string,
  children?: string,
  onClick?: any,
  symbol?: string,
}) =>
  (<div className={className}>
    {children}
    {onClick &&
      <div className="action" onClick={onClick}>
        {symbol || <GoX />}
      </div>}
  </div>);

const style = ({ theme, color, onClick }: { theme: THEME, color?: string, onClick: any }) => {
  const backgroundColor = hexOrColor(color)(theme.colors.primary);
  const actionStyles = onClick
    ? {
      '& .action': {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 16,
        opacity: 0,
        transform: 'translateX(10px)',
        transition: '.3s transform ease, .3s opacity ease',
        backgroundColor,
      },

      '& .action::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(90deg, transparent 0%, ${backgroundColor} 100%)`,
      },
    }
    : {};

  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    padding: theme.spacing / 4,
    cursor: 'pointer',
    overflow: 'hidden',
    fontSize: '.8rem',
    backgroundColor,
    color: readableTextColor(backgroundColor)(['black', 'white']),

    ':hover .action': {
      opacity: 1,
      transform: 'none',
    },

    ...actionStyles,
  };
};

export default glamorous(Chip)(style);
export { Chip };
