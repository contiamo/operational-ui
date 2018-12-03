Sometimes, we'd like to show someone's name and email address. This component lets us show a contact in a consistent way. It pairs will with an `Avatar`.

## Basic Usage

```jsx
<>
  <Contact name="Paul Heigl" meta="heigl.paul@gmail.com" />
  <Contact name="Paul Heigl" meta="+49 173 712 9124" />
</>
```

## With Avatar

```jsx
initialState = { name: "Kenye Wheelest", email: "kweezy@notformidablelabs.com" }
;<div style={{ display: "flex" }}>
  <Avatar style={{ marginRight: 8 }} name={state.name} />
  <Contact name={state.name} meta={state.email} />
</div>
```
