// @flow
import React from 'react';
import glamorous from 'glamorous';

const Canvas = ({ className, children }: { className: string, children: HTMLElement }) =>
  (<div className={className}>
    {children}
  </div>);

const styles = ({ theme }: { theme: THEME }): {} => ({
  display: 'flex',
  padding: theme.spacing,
  backgroundColor: theme.greys && theme.greys['10'],
});

export default glamorous(Canvas)(styles);
