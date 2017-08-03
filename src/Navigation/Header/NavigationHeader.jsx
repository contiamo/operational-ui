// @flow
import React from 'react';
import glamorous from 'glamorous';

const NavigationHeader = ({ className }: { className: string }) =>
  <div className={className}>Contiamo</div>;

const style = (props, theme): {} => ({
  padding: theme.spacing,
  fontSize: 32,
  fontWeight: 'bold',
  color: theme.greys[80],
});

export default glamorous(NavigationHeader)(style);
