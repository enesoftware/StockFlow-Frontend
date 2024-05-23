import { publishFacade } from '@angular/compiler';

export class Shelf {
  constructor(
    public no: number,
    public capacity: number,
    public quantity: number,
    public itemName: String
  ) {}
}
