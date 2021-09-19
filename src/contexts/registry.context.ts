import { createContext } from 'react';
import { RegistryItem } from '~/interfaces';
import { elementsCollide } from '~/utils';

export class Registry<T> {
  public map = new Map<number, RegistryItem<T>>();

  private selectedLength: number;

  public register(item: RegistryItem<T>): void {
    this.map.set(item.id, item);
  }

  public unregister(id: number): void {
    this.map.delete(id);
  }

  public getSelected = (boxRect: DOMRect): T[] | null => {
    const selected = Array.from(this.map)
      .map(([_, r]) => {
        if (!r.ref.current) {
          return null;
        }

        const collides = elementsCollide(r.ref.current.getBoundingClientRect(), boxRect);

        if (collides) {
          return r.data;
        }

        return null;
      })
      .filter((r): r is T => r !== null);

    if (selected.length !== this.selectedLength) {
      this.selectedLength = selected.length;

      return selected;
    }

    return null;
  };
}

export const RegistryContext = createContext<Registry<any> | null>(null);
