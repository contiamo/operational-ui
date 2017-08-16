import React from 'react';
import { Box, Camera } from 'react-feather';

import Header, {
  HeaderItem,
  HeaderSeparator,
  HeaderTitle,
} from '../../../components/Header/Header';

export default () =>
  (<Header color="#445873">
    <HeaderTitle>Contiamo</HeaderTitle>
    <HeaderItem>
      <Camera /> Gallery
    </HeaderItem>
    <HeaderItem>
      <Box /> Components
    </HeaderItem>
    <HeaderSeparator />
    <HeaderItem>Logout</HeaderItem>
  </Header>);
