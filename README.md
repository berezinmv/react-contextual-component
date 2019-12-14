# react-contextual-component

Switch components for different contexts with ease

## Reasons

Sometimes during development of react applications you have to
render one or another component based on some conditions.
And sometimes you have a lot of components to be rendered based
on same conditions.
This is a library which will help you to reduce amount of
boilerplate needed to implement such requirements.

## Example

For full example refer to `examples/index.tsx`
To start an example run `npm run example`

```typescript jsx
type ContextValues = "mobile" | "desktop" | "highDPI";

// create Provider and component factory
const { Provider, createComponent } = createComponentContext<ContextValues>();

// create contextual component (keys - possible context values)
const TestComponent = createComponent({
  mobile: () => <span>mobile component</span>,
  desktop: () => <span>desktop component</span>,
  highDPI: () => <span>highDPI component</span>
});

function Example() {
  // ...
  return (
    // Pass active context value to proivder
    <Provider value={contextValue}>
      {/* ... */}
      {/* use generated component as any other */}
      <TestComponent />
      {/* ... */}
    </Provider>
  );
}
```
