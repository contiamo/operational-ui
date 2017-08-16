// @flow
import React from 'react';
import glamorous from 'glamorous';

const HeaderTitle = ({
  className,
  children,
}: {
  className: string,
  children: mixed,
}): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>);

const style = ({ theme, color }: { theme: THEME, color: string }): {} => ({
  marginRight: theme.spacing,
  fontSize: '1.7rem',
  fontWeight: 600,
});

export default glamorous(HeaderTitle)(style);
