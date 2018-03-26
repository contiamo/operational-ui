# Records

Records are general-purpose displays of resources, composed of a header element and a body that can be expanded and hidden from a standardized button on the top right.

## Usage

```js
<Record>
  <RecordHeader>
    Deutsche Bahn (German Railway Company)
  </RecordHeader>
  <RecordBody>
    <InfoTile label="Founded">1994</InfoTile>
    <InfoTile label="Employees">~300,000</InfoTile>
    <InfoTile label="Annual Revenue">A lot!</InfoTile>
  </RecordBody>
</Record>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| children | Children, typically a single <RecordHeader/> element and a single optional <RecordBody/> element. | React.ReactElement |  | Yes |
| initiallyExpanded | Specifies the expanded state the component should start in (whether RecordBody should show). | React.ReactElement |  | Yes |
| controls | Replaces the standard expand button with a custom set of controls. | React.ReactElement |  | Yes |
