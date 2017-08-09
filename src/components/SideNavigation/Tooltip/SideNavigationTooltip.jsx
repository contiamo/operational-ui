// @flow
import React from 'react';

import Tooltip from '../../Tooltip/Tooltip';

const SideNavigationTooltip = (props: {}): React$Element<*> =>
  (<Tooltip {...props}>
    {props.children ? props.children : ''}
  </Tooltip>);

export default SideNavigationTooltip;
