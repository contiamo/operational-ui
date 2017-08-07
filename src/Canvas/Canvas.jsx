// @flow
import React from 'react';
import glamorous from 'glamorous';

const Canvas = ({ className, children }: { className: string, children: HTMLElement }) =>
  (<div className={className}>
    {children}
  </div>);

const styles = {};

export default glamorous(Canvas)(styles);
