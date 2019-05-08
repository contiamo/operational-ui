# Basic Usage

```jsx
import { DataTable, ResourceName, Checkbox } from "@operational/components"
;<DataTable
  rows={[
    {
      isHeading: true,
      cells: [
        <ResourceName strong>Name</ResourceName>,
        <ResourceName strong>Age</ResourceName>,
        <ResourceName strong>Twitter</ResourceName>,
        <ResourceName strong>Video</ResourceName>,
      ],
    },
    {
      isHeading: true,
      cells: ["ReactNode", "Numeric", "Text", "Video"],
    },
    {
      isHeading: true,
      isDisabled: true,
      cells: [
        <>
          <Checkbox checked condensed /> is required
        </>,
        <>
          <Checkbox condensed /> is required
        </>,
        <>
          <Checkbox condensed /> is required
        </>,
        <>
          <Checkbox condensed /> is required
        </>,
      ],
    },
    {
      cells: [
        <ResourceName>Tejas Kumar</ResourceName>,
        21,
        "@tejaskumar_",
        <iframe
          style={{ width: "100%", height: 200 }}
          src="https://www.youtube.com/embed/goMsCPQYhlQ"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />,
      ],
    },
    {
      cells: [
        <ResourceName>Imogen Mason</ResourceName>,
        27,
        "",
        <iframe
          style={{ width: "100%", height: 200 }}
          src="https://www.youtube.com/embed/Xd1gywPOibg"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />,
      ],
    },
    {
      cells: [
        <ResourceName>Fabien Bernard</ResourceName>,
        30,
        "@fabien0102",
        <iframe
          style={{ width: "100%", height: 200 }}
          src="https://www.youtube.com/embed/pz0XgAKR9Oc"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />,
      ],
    },
    {
      cells: [
        <ResourceName>Mykhailo Potomin</ResourceName>,
        32,
        "@mpotomin",
        <iframe
          style={{ width: "100%", height: 200 }}
          src="https://www.youtube.com/embed/gPiTIhFQp3U"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />,
      ],
    },
    {
      cells: [
        <ResourceName>Stereo freaking BOOSTER</ResourceName>,
        -Infinity,
        "@stereobooster",
        <iframe
          style={{ width: "100%", height: 200 }}
          src="https://www.youtube.com/embed/KFz6t3Tqd0g"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />,
      ],
    },
  ]}
/>
```
