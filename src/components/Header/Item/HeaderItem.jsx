// @flow
import React from 'react';
import glamorous from 'glamorous';

const HeaderItem = ({
  className,
  children,
  onClick,
  }: {
  className: string,
  children: mixed,
  onClick?: void,
}): React$Element<*> =>
  (<div onClick={onClick} className={className}>
    {children}
  </div>);

const style = ({ theme }: { theme: THEME }): {} => {
  const opacity = 0.1;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing && theme.spacing / 2}px ${theme.spacing && theme.spacing}px`,
    borderRadius: 2,
    cursor: 'pointer',
    transition: '.1s background-color ease, .05s transform ease',
    userSelect: 'none',

    ':hover': {
      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    },

    ':not(.active):active': {
      transform: 'scale(0.95)',
      backgroundColor: `rgba(0, 0, 0, ${opacity * 2})`,
    },

    '&.active': {
      backgroundColor: `rgba(0, 0, 0, ${opacity * 2})`,
    },

    '& + &': {
      marginLeft: theme.spacing && theme.spacing / 2,
    },

    '& > svg': {
      width: 16,
      marginRight: theme.spacing && theme.spacing / 2,
    },
  };
};

export default glamorous(HeaderItem)(style);
