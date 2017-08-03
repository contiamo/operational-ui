// @flow
export type MenuItem = {
  key: number,
  route: string,
  label: string,
};

export type MenuSection = {
  key: number,
  label: string,
  items: Array<MenuItem>,
};
