export const elementsCollide = (first: DOMRect, second: DOMRect): boolean => {
  return !(
    first.right < second.left ||
    first.left > second.right ||
    first.bottom < second.top ||
    first.top > second.bottom
  );
};
