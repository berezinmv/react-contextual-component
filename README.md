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

```typescript jsx
// This function will decide what context is active at the moment
function getComponentId(args: { counter: number }) {
  switch (args.counter) {
    case 0:
      return "zero";
    case 1:
      return "first";
    case 2:
      return "second";
    default:
      return "fallback";
  }
}

// Generate Provider and component factory
const { Provider, createComponent } = createComponentContext(getComponentId);

// This is contextual component
// The rendered component depends on current context value
const TestComponent = createComponent({
  zero: () => <span>zero component</span>,
  first: () => <span>first component</span>,
  second: () => <span>second component</span>,
  fallback: () => <span>fallback component</span>
});

function Example() {
  const [counter, setCounter] = useState(0);

  return (
    // props passed to provider will be arguments of a context function
    <Provider counter={counter}>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      <button onClick={() => setCounter(counter - 1)}>decrement</button>
      <br />
      {/* use our generated component as any other */}
      <TestComponent />
    </Provider>
  );
}
```
