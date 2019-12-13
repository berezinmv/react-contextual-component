import React, { createContext, FC, ReactNode } from "react";
import { ComponentMap, ContextFunction } from "./createComponentContext.h";

function createComponentContext<T, C>(fn: ContextFunction<T, C>) {
  const { Provider: RProvider, Consumer: RConsumer } = createContext<C>(null);

  function Provider(props: T & { children: ReactNode }) {
    const value = fn(props);

    return <RProvider value={value}>{props.children}</RProvider>;
  }

  function createComponent<P>(componentMap: ComponentMap<C, P>): FC<P> {
    return function(props: P) {
      return (
        <RConsumer>
          {value => {
            const ContextualComponent = componentMap.get(value);

            return <ContextualComponent {...props} />;
          }}
        </RConsumer>
      );
    };
  }

  return { Provider, createComponent };
}

export default createComponentContext;
