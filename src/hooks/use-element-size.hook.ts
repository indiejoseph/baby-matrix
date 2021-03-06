import { RefObject, useCallback, useEffect, useState } from 'react';
import { Size } from '~/interfaces/size.interface';
// See: https://usehooks-typescript.com/react-hook/use-event-listener
import { useEventListener } from './use-event-listener.hook';

export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  elementRef: RefObject<T>
): Size {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  // Prevent too many rendering using useCallback
  const updateSize = useCallback(() => {
    const node = elementRef?.current;

    if (node) {
      setSize({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0,
      });
    }
  }, [elementRef]);

  // Initial size on mount
  useEffect(() => {
    updateSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEventListener('resize', updateSize);

  return size;
}
