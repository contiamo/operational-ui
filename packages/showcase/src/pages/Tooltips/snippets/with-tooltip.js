export default `
const MyDiv = () => (<div>Hover for Spanish!</div>)
const MyDivWithTooltip = withTooltip(MyDiv)

ReactDOM.render(
  <MyDivWithTooltip
    tooltip="Hola, compadre!"
    tooltipColor="#f00"
    tooltipAnchor="bottom"
  >
    Hover for Spanish
  </MyDivWithTooltip>,
  document.querySelector('#app)
)
`
