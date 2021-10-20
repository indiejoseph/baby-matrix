import { SystemProps, x } from '@xstyled/styled-components';
import React, { forwardRef } from 'react';

export interface CellProps extends SystemProps {
  name: string;
  opacity: number;
  randColor: string;
  isSelected?: boolean;
}

export const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ name, opacity, randColor, isSelected, ...props }, ref) => (
    <x.div ref={ref} pl={2} pt={2} userSelect="none" className="cell" {...props}>
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
          whiteSpace="nowrap"
        >
          {isSelected ? name : undefined}
        </x.div>
      </x.div>
    </x.div>
  )
);
