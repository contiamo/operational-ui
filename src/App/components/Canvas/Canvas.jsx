// @flow
import React from 'react';
import glamorous from 'glamorous';

const Canvas = ({ className, children }: { className: string, children: HTMLElement }) =>
  (<div className={className}>
    <div className="Canvas__body">
      {children}
    </div>
  </div>);

const styles = ({ theme }: { theme: THEME }): {} => ({
  display: 'flex',
  alignItems: 'flex-start',
  height: '100%',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',

  '& .Canvas__body': {
    maxWidth: 768,
  },

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
