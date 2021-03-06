import { useEffect, useState } from 'react';

export interface UseScreenInch {
  width: number;
  height: number;
}

export const useScreenInch = (ratio = 1): UseScreenInch | undefined => {
  const [inchSize, setInchSize] = useState<UseScreenInch>();

  useEffect(() => {
    let inchDom: HTMLDivElement | null;

    if (typeof window !== 'undefined') {
      inchDom = document.querySelector('#inch');

      if (!inchDom) {
        inchDom = document.createElement('div');
        inchDom.setAttribute('id', 'inch');
        inchDom.setAttribute(
          'style',
          'height: 1in; width: 1in; left: 100%; position: fixed; top: 100%;'
        );
        document.body.appendChild(inchDom);
      }

      setInchSize({
        width: inchDom.offsetWidth * ratio,
        height: inchDom.offsetHeight * ratio,
      });
    }

    return () => {
      if (inchDom && typeof window !== 'undefined') {
        document.body.removeChild(inchDom);
      }
    };
  }, [setInchSize, ratio]);

  return inchSize;
};
