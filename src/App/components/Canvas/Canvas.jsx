// @flow
import React from 'react';
import glamorous from 'glamorous';

const Canvas = ({ className, children }: { className: string, children: HTMLElement }) =>
  (<div className={className}>
    {children}
  </div>);

const styles = ({ theme }: { theme: THEME }): {} => ({
  display: 'flex',
  alignItems: 'flex-start',
  height: '100%',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',

  '& .playground': {
    display: 'flex',
  },

  '& .playgroundCode, & .playgroundPreview': {
    flex: '1 1 50%',
  },
  '& .playgroundPreview': {
    marginLeft: 16,
  },
});

export default glamorous(Canvas)(styles);
export { Canvas };
