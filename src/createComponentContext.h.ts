import { ComponentType } from "react";

export type ContextFunction<T, C> = {
  (args: Partial<T>): C;
};

export type ComponentMap<C, P> = {
  get(key: C): ComponentType<P>;
};
