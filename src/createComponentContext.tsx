import React, { ComponentType, createContext, FC } from "react";
import { ComponentMap, IndexType } from "./createComponentContext.h";

function createComponentContext<Values extends IndexType>() {
  const { Provider, Consumer } = createContext<Values>(null);

  function createComponent<P>(componentMap: ComponentMap<P, Values>): FC<P> {
    return function(props: P) {
      return (
        <Consumer>
          {value => {
            const ContextualComponent = componentMap[value] as ComponentType<P>;

            return <ContextualComponent {...props} />;
          }}
        </Consumer>
      );
    };
  }

  return { Provider, createComponent };
}

export default createComponentContext;
