import { x } from '@xstyled/styled-components';
import Debug from 'debug';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useScreenInch, useWindowSize } from '../../hooks';
import { Selectable, SelectionArea } from '../selectable';

const debug = Debug('web:board');
const colors = [
  'purple',
  'rose',
  'pink',
  'fuchsia',
  'violet',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'emerald',
  'green',
  'lime',
  'yellow',
  'amber',
  'orange',
];

export const Board: FC = () => {
  const screenSize = useWindowSize();
  const [randColor, setRandColor] = useState(colors[0]);
  const [selected, setSelected] = useState<number[]>([]);
  const inchSize = useScreenInch(0.8);
  const [numX, numY, offsetX, offsetY] = useMemo(() => {
    if (!screenSize || !inchSize) {
      return [0, 0, 0, 0, 0, 0];
    }

    const [x1, y1] = [
      Math.floor(screenSize.width / inchSize.width),
      Math.floor(screenSize.height / inchSize.height),
    ];

    console.log(screenSize.width, x1 * inchSize.width);

    const w1 = x1 * inchSize.width;
    const h1 = y1 * inchSize.height;
    const px1 = Math.floor((screenSize.width - w1) / 2);
    const py1 = Math.floor((screenSize.height - h1) / 2);

    return [x1, y1, px1, py1];
  }, [screenSize, inchSize]);

  const handleOnSelection = useCallback((items: number[]) => {
    setSelected(items);
  }, []);

  const handleOnMouseDown = useCallback(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];

    setRandColor(color);
    setSelected([]);
  }, []);

  debug(
    'screenSize: %O, inchSize: %O, numX: %d, numY: %d, offsetX: %d, offsetY: %d',
    screenSize,
    inchSize,
    numX,
    numY,
    offsetX,
    offsetY
  );

  return (
    <SelectionArea
      id="board"
      display="grid"
      w="100vw"
      h="100vh"
      px={`${offsetX}px`}
      py={`${offsetY}px`}
      userSelect="none"
      gridTemplateColumns={`repeat(${numX}, 1fr)`}
      gridTemplateRows={`repeat(${numY}, 1fr)`}
      onSelection={handleOnSelection}
      onMouseDown={handleOnMouseDown}
      onTouchStart={handleOnMouseDown}
    >
      {Array.from(new Array(numX * numY)).map((_, index) => (
        <Selectable key={index.toString()} data={index}>
          {innerRef => {
            const selectedIndex = selected.indexOf(index);
            const isSelected = selectedIndex !== -1;
            const alpha = Math.min(1, 1 - selected.indexOf(index) / selected.length / 2);
            const opacity = Math.round((alpha * 100) / 10) * 10;

            return (
              <x.div
                key={`cell-${index.toString()}`}
                ref={innerRef}
                pl={2}
                pt={2}
                w={1}
                h={1}
                userSelect="none"
                className="cell"
              >
                <x.div
                  bg={isSelected ? `${randColor}-600-a${opacity}` : 'rgba(0,0,0,0.15)'}
                  borderRadius="999px"
                  transitionDuration="500ms"
                  transitionTimingFunction="ease-in-out"
                  transitionProperty="background-color, color, font-size, box-shadow"
                  alignContent="center"
                  alignItems="center"
                  fontSize={isSelected ? '2.5rem' : '0.5rem'}
                  color={isSelected ? 'white' : 'rgba(255,255,255,0)'}
                  boxShadow={!isSelected ? 'inset -3px -3px 12px rgba(0,0,0,0.12)' : undefined}
                  w={1}
                  h={1}
                  userSelect="none"
                  display="flex"
                >
                  <x.div
                    textAlign="center"
                    w={1}
                    userSelect="none"
                    color="inherit"
                    fontSize="inherit"
                  >
                    {isSelected ? selectedIndex + 1 : undefined}
                  </x.div>
                </x.div>
              </x.div>
            );
          }}
        </Selectable>
      ))}
    </SelectionArea>
  );
};
