import React, { useState } from "react";
import { render } from "react-dom";
import createComponentContext from "../src/createComponentContext";

type ContextValues = "mobile" | "desktop" | "highDPI";

const { Provider, createComponent } = createComponentContext<ContextValues>();

const TestComponent = createComponent({
  mobile: () => <span>mobile component</span>,
  desktop: () => <span>desktop component</span>,
  highDPI: () => <span>highDPI component</span>
});

function Example() {
  const [contextValue, setContextValue] = useState<ContextValues>("mobile");

  return (
    <Provider value={contextValue}>
      <button onClick={() => setContextValue("mobile")}>mobile</button>
      <button onClick={() => setContextValue("desktop")}>desktop</button>
      <button onClick={() => setContextValue("highDPI")}>highDPI</button>
      <br />
      <TestComponent />
    </Provider>
  );
}

render(<Example />, document.getElementById("root"));
