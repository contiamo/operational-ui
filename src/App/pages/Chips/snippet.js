export default {
  chip: `
<div style={{display: 'flex'}}>

  {/* These work well in a flex-ed parent */}
  <Chip color="#006847">Hola</Chip>
  <Chip color="#fff">Compadre</Chip>

  <Chip
    color="#CE1126"
    symbol="!"
    onClick={() => window.alert('Muy bien!')}
  >
    Como estas?
  </Chip>
  {/* onClick can do literally anything you want it to */}

</div>
`,
  plusChip: `
<div style={{display: 'flex'}}>

  <PlusChip
    color="#f0f"
    size={31}
    onClick={() => window.alert('Ouch!')}
  />

  <PlusChip
    color="#f00"
    size={31}
    onClick={() => window.alert('Smiling is healthy!')}
  >
    😁
  </PlusChip>

</div>
`,
};
