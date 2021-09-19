import { RefObject } from 'react';

export interface RegistryItem<T> {
  ref: RefObject<HTMLDivElement>;
  id: number;
  data?: T;
}
