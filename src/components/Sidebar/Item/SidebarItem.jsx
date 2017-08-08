// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';

import style from './SidebarItem.style';

class SidebarItem extends Component {
  props: {
    className: string,
    title: mixed,
    children?: mixed,
    open?: boolean,
    onClick?: Function,
  };

  state: {
    open: boolean,
    updating: boolean,
  };

  static defaultProps = {
    children: '',
    open: false,
    onClick: () => true,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
      updating: false,
    };
  }

  async toggle() {
    this.setState(() => ({ updating: true }));
    if (this.props.onClick && !this.state.open) {
      await this.props.onClick();
    }
    if (!this.props.children) {
      return;
    }
    this.setState(prevState => ({
      open: !prevState.open,
      updating: false,
    }));
  }

  render() {
    return (
      <div
        className={`${this.props.className} ${this.state.updating ? 'updating' : ''} ${this.state
          .open || this.props.open
          ? 'open'
          : ''}`}
      >
        <div className="header" onClick={() => this.toggle()}>
          {this.props.title}
        </div>
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
