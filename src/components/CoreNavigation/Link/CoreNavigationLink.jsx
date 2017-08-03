import React from 'react';
import glamorous from 'glamorous';

const CoreNavigationLink = ({
  className,
  children,
  onClick,
  }: {
  className: string,
  children: mixed,
  onClick?: {},
}): React$Element<*> =>
  (<div className={className} onClick={onClick}>
    {children}
  </div>);

const style = (props: {}, theme: THEME): {} => ({
  margin: `0 ${theme.spacing * -0.5}px`,
  padding: `${theme.spacing}px`,
  minWidth: 200,
  borderRadius: 2,
  transition: '.1s background-color ease',
  backgroundColor: theme.greys[90],
  color: theme.greys.white,

  '& + &': {
    borderTop: `1px solid ${theme.greys[100]}`,
  },

  ':hover': {
    backgroundColor: theme.greys[100],
  },

  ':first-child': {
    marginTop: `${theme.spacing * -0.5}px`,
  },

  ':last-child': {
    marginBottom: `${theme.spacing * -0.5}px`,
  },
});

export default glamorous(CoreNavigationLink)(style);
