import React, { Component } from 'react';
import glamorous, { Img } from 'glamorous';

import CoreNavigationTooltip from '../Tooltip/CoreNavigationTooltip';

class CoreNavigationIcon extends Component {
  props: {
    className?: string,
    src: string,
    link?: string,
    label?: string,
    tooltipPosition?: string,
    dropdown?: boolean,
    main?: boolean,
  };

  state: {
    active: boolean,
    tooltip: number,
  };

  static defaultState = {
    active: false,
    tooltip: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      tooltip: 0,
    };
  }

  tooltipOn() {
    this.setState(() => ({ tooltip: 1 }));
  }

  tooltipOff() {
    this.setState(() => ({ tooltip: 0 }));
  }

  render() {
    return (
      <div
        className={this.props.className}
        onMouseEnter={() => this.tooltipOn()}
        onMouseLeave={() => this.tooltipOff()}
      >
        {this.props.src &&
          <Img css={{ maxWidth: '100%' }} alt={this.props.label} src={this.props.src} />}

        {this.props.children && !this.props.dropdown ? this.props.children : ''}

        {this.props.label &&
          <CoreNavigationTooltip position={this.props.tooltipPosition} visible={this.state.tooltip}>
            {this.props.label}
          </CoreNavigationTooltip>}

        {this.props.dropdown &&
          <CoreNavigationTooltip position={this.props.tooltipPosition} visible={this.state.tooltip}>
            {this.props.children}
          </CoreNavigationTooltip>}
      </div>
    );
  }
}

const style = (props: {}, theme: THEME): {} => {
  let width = 20,
    height = 20;

  if (props.main) {
    width = 40;
    height = 40;
  }

  return {
    position: 'relative',
    width,
    height,
    borderRadius: 2,
    cursor: 'pointer',

    ':first-child': {
      marginBottom: theme.spacing,
    },
  };
};

export default glamorous(CoreNavigationIcon)(style);
