export default {
  tooltip: `
<Tooltip active color="#00f">
  Hi, I try to be helpful.
</Tooltip>

`,
  withTooltip: `
  const MyDiv = () => (<div>Hover for Spanish!</div>);
  const MyDivWithTooltip = withTooltip(MyDiv);

  ReactDOM.render(
    <MyDivWithTooltip
      tooltip="Hola, compadre!"
      tooltipColor="#f00"
      tooltipAnchor="bottom"
    >
      Hover for Spanish
    </MyDivWithTooltip>,
    document.querySelector('#app)
  );
`,
};
