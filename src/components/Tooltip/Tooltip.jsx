// @flow
import React from 'react';
import glamorous from 'glamorous';
import style from './Tooltip.style';

const Tooltip = ({
  className,
  children,
  position,
}: {
  className: string,
  children: mixed,
  position?: string,
}): React$Element<*> =>
  (<div className={`${className} tooltip`}>
    <div className="tooltip__content">
      {children}
    </div>
  </div>);

const TOOLTIP_CONTAINER_STYLE = {
  opacity: 1,
  pointerEvents: 'all',
};

export default glamorous(Tooltip)(style);
export { TOOLTIP_CONTAINER_STYLE };
