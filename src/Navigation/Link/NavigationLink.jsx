// @flow
import React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

// First style the link component that we'll use in the menu item.
// IMO this is too small to go into and style. That, and it comes straight
// from React Router so let's just do it here.
const linkStyle = (props: {}, theme: THEME): {} => ({
  color: theme.greys[90],
  textDecoration: 'none',
});

const StyledLink = glamorous(Link)(linkStyle);

// Now we create the actual menu item or Navigation Link.
const NavigationLink = ({
  className,
  to,
  children,
  }: {
  className: string,
  to: string,
  children: string,
}) =>
  (<div onClick={e => e.stopPropagation()}>
    <StyledLink className={className} to={to}>
      &rsaquo; {children}
    </StyledLink>
  </div>);

const navigationLinkStyle = (props: {}, theme: THEME) => ({
  display: 'block',
  marginLeft: theme.spacing * -1,
  marginRight: theme.spacing * -1,
  paddingTop: theme.spacing / 2,
  paddingBottom: theme.spacing / 2,
  paddingLeft: theme.spacing,
  paddingRight: theme.spacing,
  transition: 'background-color .1s ease',

  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

export default glamorous(NavigationLink)(navigationLinkStyle);
