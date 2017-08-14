// @flow
import React, { Component } from 'react';
import glamorous, { Div } from 'glamorous';

import style from './SidebarItem.style';
import withTooltip from '../../Tooltip/withTooltip';

class SidebarItem extends Component {
  props: {
    className: string,
    title: mixed,
    children?: mixed,
    open: boolean,
    onClick?: void,
    tooltip?: string,
  };

  state: {
    open: boolean,
    updating: boolean, // async, woo!
  } = {
    open: this.props && this.props.open,
    updating: false,
  };

  static defaultProps = {
    children: '',
    open: false,
    tooltip: '',
  };

  async toggle() {
    if (!this.props.children) {
      return false;
    }
    this.setState(() => ({ updating: true }));
    // If it is closed,
    if (this.props.onClick && !this.state.open) {
      await this.props.onClick(); // wait for the promise to resolve first.
    }
    this.setState(prevState => ({
      open: !prevState.open,
      updating: false,
    }));
  }

  render() {
    /**
      Only the header should have a tooltip, else the tooltip will show
      even when the cursor is over the children... who may also have their
      own tooltips.
    */
    const HeaderWithTooltip = withTooltip(Div);
    return (
      <div
        className={`${this.props.className} ${this.state.updating ? 'updating' : ''} ${this.state
          .open || this.props.open
          ? 'open'
          : ''}`}
      >
        <HeaderWithTooltip
          className="header"
          tooltip={this.props.tooltip}
          onClick={() => this.toggle()}
        >
          {this.props.title}
        </HeaderWithTooltip>
        {this.state.open || this.props.open
          ? <div className="content">
            {this.props.children}
          </div>
          : ''}
      </div>
    );
  }
}

export default glamorous(SidebarItem)(style);
export { SidebarItem };
