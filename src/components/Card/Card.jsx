import React from 'react';
import glamorous from 'glamorous';

const Card = ({ className, children }: { className?: string, children: mixed }) =>
  (<div className={className}>
    {children}
  </div>);

const style = ({ theme }: { theme: THEME }) => ({
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.14)',
  backgroundColor: 'white',
});

export default glamorous(Card)(style);
export { Card };
