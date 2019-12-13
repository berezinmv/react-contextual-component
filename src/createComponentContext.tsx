import React, { createContext, FC, PropsWithChildren } from "react";
import { ComponentMap, ContextFunction } from "./createComponentContext.h";

function createComponentContext<T>(fn: ContextFunction<T>) {
  const { Provider: RProvider, Consumer: RConsumer } = createContext<string>(
    null
  );

  function Provider(props: PropsWithChildren<T>) {
    const value = fn(props);

    return <RProvider value={value}>{props.children}</RProvider>;
  }

  function createComponent<P>(componentMap: ComponentMap<P>): FC<P> {
    return function(props: P) {
      return (
        <RConsumer>
          {value => {
            const ContextualComponent = componentMap[value];

            return <ContextualComponent {...props} />;
          }}
        </RConsumer>
      );
    };
  }

  return { Provider, createComponent };
}

export default createComponentContext;
