import React, { useState } from "react";
import { render } from "react-dom";
import createComponentContext from "../src/createComponentContext";

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

const { Provider, createComponent } = createComponentContext(getComponentId);

const TestComponent = createComponent({
  zero: () => <span>zero component</span>,
  first: () => <span>first component</span>,
  second: () => <span>second component</span>,
  fallback: () => <span>fallback component</span>
});

function Example() {
  const [counter, setCounter] = useState(0);

  return (
    <Provider counter={counter}>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      <button onClick={() => setCounter(counter - 1)}>decrement</button>
      <br />
      <TestComponent />
    </Provider>
  );
}

render(<Example />, document.getElementById("root"));
