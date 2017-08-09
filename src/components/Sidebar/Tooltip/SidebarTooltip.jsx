// @flow
import React from 'react';
import glamorous from 'glamorous';

import Tooltip from '../../Tooltip/Tooltip';

const SidebarTooltip = (props: {}): React$Element<*> =>
  (<Tooltip {...props}>
    {props.children ? props.children : ''}
  </Tooltip>);

const style = {
  position: 'fixed',
};

export default glamorous(SidebarTooltip)(style);
