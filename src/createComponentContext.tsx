import React, { ComponentType, createContext } from "react";

type ContextFunction<T, C> = {
  (args: Partial<T>): C;
};

type ComponentMap<C, P> = {
  get(key: C): ComponentType<P>;
};

function createComponentContext<T, C>(fn: ContextFunction<T, C>) {
  const { Provider: RProvider, Consumer: RConsumer } = createContext<C>(null);

  function Provider(props: T) {
    const value = fn(props);

    return <RProvider value={value} />;
  }

  function createComponent<P>(componentMap: ComponentMap<C, P>) {
    return function(props: P) {
      return (
        <RConsumer>
          {value => {
            const ContextComponent = componentMap.get(value);

            return <ContextComponent {...props} />;
          }}
        </RConsumer>
      );
    };
  }

  return { Provider, createComponent };
}

export default createComponentContext;
