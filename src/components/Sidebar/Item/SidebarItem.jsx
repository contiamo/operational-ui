// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';
import { css } from 'glamor';

class SidebarItem extends Component {
  props: {
    className: string,
    children?: mixed,
    title: mixed,
    onClick?: Function,
  };

  state: {
    open: boolean,
  };

  static defaultProps = {
    children: '',
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
        <div className="content">
          {this.state.open || this.props.open ? this.props.children : ''}
        </div>
      </div>
    );
  }
}

const style = ({ theme, open }: { theme: THEME, open: boolean }): {} => {
  const spin = css.keyframes({
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359deg)',
    },
  });
  return {
    '> .header': {
      position: 'relative',
      padding: theme.spacing / 2,
      paddingRight: theme.spacing,
      cursor: 'pointer',
    },

    '> .header:hover': {
      backgroundColor: theme.greys && theme.greys['10'],
    },

    '& + &': {
      borderTop: `1px solid ${theme.greys && theme.greys['20']}`,
    },

    '> .header::after': {
      content: "''",
      position: 'absolute',
      top: 12,
      right: theme.spacing / 2,
      display: 'block',
      width: 0,
      height: 0,
      border: '4px solid transparent',
      borderLeftColor: theme.greys && theme.greys['30'],
      transition: '.15s transform ease',
    },

    '&.open > .header': {
      borderBottom: `1px solid ${theme.greys && theme.greys['30']}`,
    },

    '&.open > .header::after': {
      transform: 'translateX(-2px) rotate(90deg)',
    },

    '&.updating > .header::after': {
      top: 9,
      width: 16,
      height: 16,
      borderRadius: '50%',
      boxShadow: `1px 0px 0px 0px ${theme.greys && theme.greys['70']} inset`,
      animation: `.7s ${spin} linear infinite`,
      border: 0,
    },

    '& .content': {
      position: 'relative',
      paddingLeft: theme.spacing,
    },

    '& .content::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'block',
      width: theme.spacing,
      height: '100%',
      borderRight: `1px solid ${theme.greys && theme.greys['30']}`,
      backgroundColor: theme.greys && theme.greys['10'],
    },
  };
};

export default glamorous(SidebarItem)(style);
