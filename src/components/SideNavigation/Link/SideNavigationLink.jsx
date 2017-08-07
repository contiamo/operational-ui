// @flow
import React from 'react';
import glamorous from 'glamorous';

type props = {
  className: string,
  children: mixed,
  onClick: void,
  theme: THEME,
};

const SideNavigationLink = ({ className, children, onClick }: props): React$Element<*> =>
  (<div className={className} onClick={onClick}>
    {children}
  </div>);

const style = (props: props): {} => ({
  position: 'relative',
  zIndex: 2,
  margin: `0 ${props.theme.spacing * -0.5}px`,
  padding: `${props.theme.spacing}px`,
  minWidth: 200,
  borderRadius: 2,
  transition: '.1s background-color ease',
  backgroundColor: props.theme.greys[90],
  color: props.theme.greys.white,

  '& + &': {
    borderTop: `1px solid ${props.theme.greys['100']}`,
  },

  ':hover': {
    backgroundColor: props.theme.greys['100'],
  },

  ':first-child': {
    marginTop: `${props.theme.spacing * -0.5}px`,
  },

  ':last-child': {
    marginBottom: `${props.theme.spacing * -0.5}px`,
  },
});

export default glamorous(SideNavigationLink)(style);
