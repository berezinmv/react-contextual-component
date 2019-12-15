import React from "react";
import { render } from "@testing-library/react";
import createComponentContext from "../createComponentContext";

describe("createComponentContext", function() {
  let Provider, createComponent;

  beforeEach(function() {
    const context = createComponentContext();

    Provider = context.Provider;
    createComponent = context.createComponent;
  });

  it("should create Provider and component factory", function() {
    expect(Provider).toBeDefined();
    expect(createComponent).toBeDefined();
    expect(typeof createComponent).toBe("function");
  });

  describe("createComponent", function() {
    let ContextualComponent;

    function FirstComponent() {
      return <div>first component</div>;
    }

    function SecondComponent() {
      return <div>second component</div>;
    }

    beforeEach(function() {
      ContextualComponent = createComponent({
        first: FirstComponent,
        second: SecondComponent
      });
    });

    it("should create new functional component", function() {
      expect(ContextualComponent).toBeDefined();
      expect(typeof ContextualComponent).toBe("function");
    });

    it("should render component based on current context value", function() {
      const component = render(
        <Provider value="first">
          <ContextualComponent />
        </Provider>
      );

      expect(component.queryByText(/first component/i)).toBeTruthy();

      component.rerender(
        <Provider value="second">
          <ContextualComponent />
        </Provider>
      );

      expect(component.queryByText(/second component/i)).toBeTruthy();
    });
  });
});
