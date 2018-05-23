# Timelines

Display information vertically on a timeline from top to bottom.

## Usage

A timeline is composed of multiple TimeLineItem componenets nested inside a container Timeline component. Items may contain any children.

```jsx
<Timeline>
  <TimelineItem color="success">
    <h3>Service visit - issue resolved</h3>
    <p>1 week ago</p>
  </TimelineItem>
  <TimelineItem color="error">
    <h3>Network issues</h3>
    <p>2 days ago</p>
  </TimelineItem>
  <TimelineItem>
    <h3>Contract extended</h3>
    <p>5 days ago</p>
  </TimelineItem>
  <TimelineItem color="warning">
    <h3>Contract expires in 1 month</h3>
    <p>2 weeks ago</p>
  </TimelineItem>
</Timeline>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| color | It can be a named theme color or a hex value. | string | info | Yes |
| icon | Icon name, see https://feathericons.com/ (convert name to PascalCase) | string | '' | Yes |
