// @flow
import React, { Component } from 'react';
import glamorous, { Img } from 'glamorous';

type props = {
  className: string,
  children: mixed,
  theme: THEME,
};

const SideNavigationItem = ({ className, children }: props): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>);

const style = (props: props): {} => {
  let width = 20,
    height = 20;

  if (props.main) {
    width = 40;
    height = 40;
  }

  return {
    position: 'relative',
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 2,
    cursor: 'pointer',

    ':first-child': {
      marginBottom: props.theme.spacing,
    },

    '& > .tooltip': {
      opacity: 0,
      transform: 'translateX(-10px)',
      pointerEvents: 'none',
    },

    ':hover > .tooltip': {
      opacity: 1,
      transform: 'none',
      pointerEvents: 'all',
    },
  };
};

export default glamorous(SideNavigationItem)(style);
