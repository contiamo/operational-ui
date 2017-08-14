import React from 'react';
import glamorous from 'glamorous';

import { hexOrColor } from '../../utils/color';

const PlusChip = ({
  className,
  children,
  onClick,
}: {
  className?: string,
  children?: string,
  onClick?: any,
}) =>
  (<div className={className} onClick={onClick}>
    {children}
  </div>);

const style = ({ theme, color }: { theme: THEME, color: string }) => {
  const borderColor = color
    ? hexOrColor(color)((theme.colors && theme.colors[color]) || 'white')
    : theme.colors.primary;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    border: '1px solid',
    cursor: 'pointer',
    color: borderColor,

    '& + &': {
      marginLeft: theme.spacing && theme.spacing / 2,
    },
  };
};

export default glamorous(PlusChip)(style);
export { PlusChip };
