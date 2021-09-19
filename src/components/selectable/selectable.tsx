import { RefObject } from 'react';
import { useSelectable } from '~/hooks/use-selectable.hook';

interface Props {
  data: any;
  children?: (ref: RefObject<HTMLDivElement>) => JSX.Element;
}

export const Selectable = ({ data, children }: Props): JSX.Element | null => {
  const ref = useSelectable(data);

  return typeof children === 'function' ? children(ref) : null;
};
