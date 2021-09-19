import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { useEventListener } from './use-event-listener.hook';

function getIsTouchDevice(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0)
  );
}

export function useMousePosition(delay = 0): { x: number; y: number } {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  let eventName: 'mousemove' | 'touchmove' = 'mousemove';
  const isTouchDevice = getIsTouchDevice();

  if (isTouchDevice) {
    eventName = 'touchmove';
  }

  // rest x y when touch end
  const handleTouchEnd = () => {
    setTimeout(() => {
      setX(0);
      setY(0);
    });
  };

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];

    setX(touch.pageX);
    setY(touch.pageY);
  };

  useEventListener('touchend', handleTouchEnd);
  useEventListener('touchstart', handleTouchStart);

  useEffect(() => {
    const sub = fromEvent<MouseEvent | TouchEvent>(document, eventName, { passive: true })
      .pipe(
        throttleTime(delay),
        map(event => {
          if ('touches' in event) {
            const touch = event.touches[0];

            return [touch.pageX, touch.pageY];
          }

          return [event.pageX, event.pageY];
        })
      )
      .subscribe(([newX, newY]) => {
        setX(newX);
        setY(newY);
      });

    return () => {
      sub.unsubscribe();
    };
  }, [delay, eventName]);

  return { x, y };
}
