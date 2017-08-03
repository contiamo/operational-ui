// @flow
import React, { Component } from 'react';
import glamorous, { Div } from 'glamorous';

import style from './NavigationSection.style';

class NavigationSection extends Component {
  state: {
    open: boolean,
  };

  props: {
    label: string,
    className: string,
    children?: string,
  };

  static defaultProps = {
    section: {},
    className: 'navigation-section',
  };

  constructor(props): void {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleSection() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <Div
        css={
          this.state.open
            ? (props, theme) => ({
              color: 'white',
              ':hover': { ...theme.gradients.secondaryToTertiary },
              ...theme.gradients.secondaryToTertiary,
            })
            : {}
        }
        onClick={() => this.toggleSection()}
        className={this.props.className}
      >
        <Div css={this.state.open ? (props, theme) => ({ marginBottom: theme.spacing }) : {}}>
          {this.props.label}
        </Div>
        {this.state.open ? this.props.children : ''}
      </Div>
    );
  }
}

export default glamorous(NavigationSection)(style);
