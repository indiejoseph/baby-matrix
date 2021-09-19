import { RefObject, useContext, useEffect, useRef } from 'react';
import { RegistryContext } from '~/contexts/registry.context';

let globalId = 0;

export const useSelectable = <T>(data: T): RefObject<HTMLDivElement> => {
  const registry = useContext(RegistryContext);
  const ref = useRef<HTMLDivElement>(null);
  const id = useRef(globalId++);

  if (registry)
    registry.register({
      id: id.current,
      data,
      ref,
    });

  useEffect(() => {
    return () => {
      if (registry) registry.unregister(id.current);
    };
  }, [registry, data]);

  return ref;
};
