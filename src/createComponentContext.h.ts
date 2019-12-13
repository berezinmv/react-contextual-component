import { ComponentType } from "react";

export type ContextFunction<T> = {
  (args: Partial<T>): string;
};

export type ComponentMap<P> = {
  [key: string]: ComponentType<P>;
};
