// @flow
import React from 'react';
import glamorous from 'glamorous';

const HeaderSeparator = ({ className }: { className: string }): React$Element<*> =>
  <div className={className} />;

const style = ({ theme }: { theme: THEME }): {} => ({
  width: 5,
  height: 5,
  margin: `0 ${theme.spacing}px`,
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
});

export default glamorous(HeaderSeparator)(style);
