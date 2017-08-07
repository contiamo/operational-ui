// @flow
import React from 'react';
import glamorous from 'glamorous';
import colorCalculator from 'tinycolor2';

import HeaderItem from './Item/HeaderItem';
import HeaderTitle from './Title/HeaderTitle';
import HeaderSeparator from './Separator/HeaderSeparator';

const Header = ({
  className,
  children,
  }: {
  className: string,
  children: mixed,
}): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>);

const style = ({ theme, color }: { theme: THEME, color: string }): {} => {
  /*
    Allow for named colors from the theme, AND hex codes.
    Test for #f00b4r, or just #foo. If it doesn't match,
    check for a named color in the theme.
  */
  const hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
  const isColorACodeOrHex = hexRegEx.test(color);

  const backgroundColor = isColorACodeOrHex ? color : theme.colors && theme.colors[color];

  const textColor = colorCalculator.mostReadable(backgroundColor, ['black', 'white']).toHexString();

  return {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing / 2}px ${theme.spacing}px`,
    backgroundColor,
    color: textColor,
  };
};

export default glamorous(Header)(style);
export { HeaderItem, HeaderSeparator, HeaderTitle };
