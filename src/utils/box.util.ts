import { IPosition } from 'spatium';
import { Size } from '~/interfaces/size.interface';

export interface BoxRect {
  width: string;
  height: string;
  left: string;
  top: string;
}

const limitSize = (size: number, parentSize: number, offset: number) => {
  return Math.min(size, parentSize - offset);
};

const getBoxSize = ([mouseX, mouseY]: IPosition, [startX, startY]: IPosition) => {
  const width = Math.abs(mouseX - startX);
  const height = Math.abs(mouseY - startY);

  return [width, height];
};

const getBoxPos = (
  [mouseX, mouseY]: IPosition,
  [startX, startY]: IPosition,
  width: number,
  height: number
): IPosition => {
  const x = mouseX < startX ? startX - width : startX;
  const y = mouseY < startY ? startY - height : startY;

  return [x, y];
};

export const updateBoxRect = (size: Size, currentPos: IPosition, startPos: IPosition): BoxRect => {
  const [width, height] = getBoxSize(currentPos, startPos);
  const [x, y] = getBoxPos(currentPos, startPos, width, height);

  return {
    width: `${limitSize(width, size.width, x)}px`,
    height: `${limitSize(height, size.height, y)}px`,
    left: `${x}px`,
    top: `${y}px`,
  };
};
