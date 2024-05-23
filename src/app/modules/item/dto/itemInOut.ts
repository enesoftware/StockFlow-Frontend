import { publishFacade } from '@angular/compiler';

export class ItemInOut {
  constructor(
    public name: string,
    public count: number,
    public operator: boolean
  ) {}
}
