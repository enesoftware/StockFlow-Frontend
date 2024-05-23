import { publishFacade } from "@angular/compiler";

export class ItemCreate {
  constructor(
    public name: string,
    public min_quantity: number,
    public quantity: number
  ) {}
}
