Breakdowns are a means of representing aggregated data in a way that should be relatively easy to reason about. The breakdown component itself belongs within the context of a larger container component that calculates numbers and supplies them to said component.

## Usage

```jsx
<Breakdown number={1} label="50 (20%)" fill={0.2}>
Stat 1
</Breakdown>
<Breakdown number={2} label="20 (40%)" fill={0.4}>
Stat 2
</Breakdown>
<Breakdown number={3} label="40 (80%)" fill={0.8}>
Stat 3
</Breakdown>
```
