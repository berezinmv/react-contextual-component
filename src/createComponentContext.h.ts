import { ComponentType } from "react";

export type IndexType = string | number | symbol;

export type ComponentMap<P, K extends IndexType> = {
  [key in K]: ComponentType<P>;
};
