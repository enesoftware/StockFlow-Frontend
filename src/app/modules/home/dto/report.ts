export class Report {
  constructor(
    public id: number,
    public userEmail: string,
    public userName: string,
    public userLastName: string,
    public description: string,
    public itemName: string,
    public active: boolean
  ) {}
}
