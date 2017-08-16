import React from 'react';
import glamorous from 'glamorous';

type props = {
  name: string,
  description: string,
  defaultValue: mixed,
  type: string,
  optional: boolean,
};

const PropsTable = ({ className, props }: { className?: string, props: Array<props> }) =>
  (<table className={className}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Type</th>
        <th>Optional?</th>
      </tr>
    </thead>
    <tbody>
      {props.map(({ name, description, defaultValue, type, optional }, index) =>
        (<tr key={index}>
          <td>
            {name}
          </td>
          <td>
            {description}
          </td>
          <td>
            {defaultValue}
          </td>
          <td>
            {type}
          </td>
          <td>
            {optional ? '✅' : '🚫'}
          </td>
        </tr>),
      )}
    </tbody>
  </table>);

const style = ({ theme }: { theme: THEME }) => ({
  textAlign: 'left',
  backgroundColor: 'white',
  border: 0,
  borderCollapse: 'collapse',
  '& th': {
    border: `1px solid ${theme.greys ? theme.greys[10] : '#eee'}`,
  },
  '& td': {
    border: `1px solid ${theme.greys ? theme.greys[20] : '#eee'}`,
  },
  '& td, & th': {
    padding: (theme.spacing || 0) / 2,
  },
  '& tr:nth-child(even)': {
    backgroundColor: theme.greys ? theme.greys[20] : '#eee',
  },
});

export default glamorous(PropsTable)(style);
export { PropsTable };
