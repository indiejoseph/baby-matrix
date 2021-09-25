import { x } from '@xstyled/styled-components';
import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { IPosition } from 'spatium';
import { Registry, RegistryContext } from '~/contexts/registry.context';
import { useEventListener, useMousePosition } from '~/hooks';

export interface SelectionAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelection?: (items: any[]) => void;
  onSelectionStart?: () => void;
  onSelectionEnd?: () => void;
  boxStyle?: CSSProperties;
}

export const SelectionArea: FC<SelectionAreaProps & React.ComponentProps<typeof x.div>> = ({
  onSelection,
  onMouseDown,
  onTouchStart,
  onSelectionEnd,
  children,
  ...props
}) => {
  const mousePos = useMousePosition();
  const registry = useMemo(() => new Registry<number>(), []);
  const [startPos, setStartPos] = useState<IPosition>([0, 0]);
  const [active, setActive] = useState(false);
  const { x: mouseX, y: mouseY } = mousePos;
  const boxTop = Math.min(startPos[1], mouseY);
  const boxLeft = Math.min(startPos[0], mouseX);
  const boxWidth = Math.abs(mousePos.x - startPos[0]);
  const boxHeight = Math.abs(mousePos.y - startPos[1]);
  const [matrixString, setMatrixString] = useState('');

  const hide = () => {
    if (active && onSelectionEnd) {
      onSelectionEnd();
    }

    setActive(false);
    setStartPos([0, 0]);
  };

  const handleOnMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const isTouchDevice = 'touches' in e;

    if (isTouchDevice) {
      if (onTouchStart) onTouchStart(e);
    } else if (onMouseDown) {
      onMouseDown(e);
    }

    if (onSelection) onSelection([]);

    if (isTouchDevice) {
      const touch = e.touches[0];

      setStartPos([touch.pageX, touch.pageY]);
    } else {
      setStartPos([e.pageX, e.pageY]);
    }

    setActive(true);
  };

  const handleOnResize = () => {
    if (onSelection) onSelection([]);
  };

  useEventListener('mouseup', hide);
  useEventListener('touchend', hide);
  useEventListener('resize', handleOnResize);

  useEffect(() => {
    if (active) {
      const selected = registry.getSelected({
        top: boxTop,
        left: boxLeft,
        right: boxLeft + boxWidth,
        bottom: boxTop + boxHeight,
      } as DOMRect);

      if (selected) {
        const n = selected
          .map((y, i, arr) => i <= 0 || arr[i - 1] - y === -1)
          .filter((y, i, arr) => y && arr.slice(0, i).every(z => z)).length; // find consecutive numbers in selected array
        const m = selected.length / n;

        setMatrixString(`${n} x ${m}`);

        if (onSelection) {
          onSelection(selected);
        }
      }
    }
  }, [mousePos, startPos, active, boxHeight, boxWidth, boxLeft, boxTop, onSelection, registry]);

  return (
    <x.div
      onMouseDown={handleOnMouseDown}
      onTouchStart={handleOnMouseDown}
      position="relative"
      {...props}
    >
      <RegistryContext.Provider value={registry}>{children}</RegistryContext.Provider>
      {active && (
        <x.div
          display={active ? 'flex' : 'none'}
          border="2px solid rgba(0, 0, 0, 0.12)"
          bg="rgba(0, 0, 0, 0.75)"
          position="absolute"
          boxSizing="border-box"
          left={`${boxLeft}px`}
          top={`${boxTop}px`}
          w={`${boxWidth}px`}
          h={`${boxHeight}px`}
          textAlign="center"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
          color="white"
          whiteSpace="nowrap"
          overflow="hidden"
          fontSize="2rem"
          textShadow="3px 3px 6px rgba(0,0,0,0.5)"
        >
          {matrixString}
        </x.div>
      )}
    </x.div>
  );
};
