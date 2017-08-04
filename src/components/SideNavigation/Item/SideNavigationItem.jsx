// @flow
import React, { Component } from 'react';
import glamorous, { Img } from 'glamorous';

type props = {
  className: string,
  children: mixed,
  size?: number,
  theme: THEME,
};

const SideNavigationItem = ({ className, children }: props): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>);

const style = (props: props): {} => ({
  position: 'relative',
  width: props.size || 30,
  height: props.size || 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  cursor: 'pointer',

  ':first-child': {
    marginBottom: props.theme.spacing,
  },

  ':hover > .tooltip': {
    '--offsetLeft': 0,
    opacity: 1,
  },
});

export default glamorous(SideNavigationItem)(style);
