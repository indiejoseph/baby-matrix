import { useEffect, useState } from 'react';

export interface UseScreenInch {
  width: number;
  height: number;
}

export const useScreenInch = () => {
  const [inchSize, setInchSize] = useState<UseScreenInch>();

  useEffect(() => {
    let inchDom: HTMLDivElement;

    if (typeof window !== 'undefined') {
      inchDom = document.createElement('div');
      inchDom.setAttribute('id', 'inch');
      inchDom.setAttribute(
        'style',
        'height: 1in; width: 1in; left: 100%; position: fixed; top: 100%;'
      );
      document.body.appendChild(inchDom);

      setInchSize({
        width: inchDom.offsetWidth,
        height: inchDom.offsetHeight,
      });
    }

    return () => {
      if (inchDom && typeof window !== 'undefined') {
        document.body.removeChild(inchDom);
      }
    };
  }, [setInchSize]);

  return inchSize;
};
