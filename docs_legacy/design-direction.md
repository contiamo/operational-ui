`@operational` packages hold a set of opinionated presentational components, composed components and data visualizations that implement a visual style well-suited for operational interfaces.

These interfaces assume regular use and familiarity by operatives. They are generally compact and flat, and fairly strict about [smallest effective differences](https://twitter.com/edwardtufte/status/450076034759524352). We'd like to encourage the following principles:

## Layout

The [recommended layout](https://ui.contiamo.com/getting-started#layout) for operational apps features a light gray background with content split up over a grid of white, light-shadowed cards. Components guide towards a highly consistent UI appearance that favors predictability over fine-grained control of hierarchy.

## Colors

Colors are used sparingly for main call-to-action elements, or to indicate areas where data changes heavily as the interface is used. Most of the interface is white or gray. Brand colors should be used as accent colors only - we encourage relying on colors with semantic meaning, encoded in the [theme](https://ui.contiamo.com/docs/theming) as `info`, `success` and `error`.

## Shadows

We encourage a flat appearance, with slight shadows on content cards, and a slightly more pronounced one on select options, tooltips and pop-ups.

## Typography

Operational UI's default font is system, in an effort to ensure readability through familiarity. You can, of course, use Operational UI with any font you like with the flip of a single theme variable, but we do encourage to err on the side of readability, as operational interfaces tend to be content- and datavis-dense.

Prefer slight variations in font sizes. To indicate hierarchy, prefer bolder and darker over bigger.

