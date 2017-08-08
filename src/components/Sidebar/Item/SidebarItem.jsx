// @flow
import React, { Component } from 'react';
import glamorous from 'glamorous';

class SidebarItem extends Component {
  props: {
    className: string,
    children?: mixed,
    title: mixed,
    onClick?: void,
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
    };
  }

  toggle() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <div
        className={`${this.props.className} ${this.state.open || this.props.open ? 'open' : ''}`}
      >
        <div
          className="header"
          onClick={() => (this.props.onClick ? this.props.onClick() : this.toggle())}
        >
          {this.props.title}
        </div>
        <div className="content">
          {this.state.open || this.props.open ? this.props.children : ''}
        </div>
      </div>
    );
  }
}

const style = ({ theme, open }: { theme: THEME, open: boolean }): {} => ({
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
});

export default glamorous(SidebarItem)(style);
