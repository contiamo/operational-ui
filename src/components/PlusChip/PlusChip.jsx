import React from 'react';
import glamorous from 'glamorous';
import GoPlus from 'react-icons/lib/go/plus';

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
    {children || <GoPlus />}
  </div>);

const style = ({ theme, color }: { theme: THEME, color: string }) => {
  const borderColor = color
    ? hexOrColor(color)((theme.colors && theme.colors[color]) || 'white')
    : theme.colors.primary;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
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
