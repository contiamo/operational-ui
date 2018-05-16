Main provider for Operational UI. Should need to wrap all your application with this component.

### Classic example
```jsx static
<OperationalUI withBaseStyles>
 <App />
</OperationalUI>
```

### With personal theme example
```jsx static
<OperationalUI theme={myTheme}>
 <App />
</OperationalUI>
```