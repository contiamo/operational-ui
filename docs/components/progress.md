# Progress

The progress element is used for larger loading sections, most typically the entire page.

## Usage

```js
<div style={{ width: 300, height: 240, border: "1px solid #adadad", padding: 20, position: "relative" }}>
  While I patiently wait for my data, this progress bar assures me that things will be ok.
  <Progress />
</div>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| fadeParent | Specifies whether the direct parent element should be faded out. If so, <Progress/> adds a near-opaque white overlay over the direct parent to make it clear that the content underneath is not accessible/dated/something new coming. | boolean | false | Yes |
