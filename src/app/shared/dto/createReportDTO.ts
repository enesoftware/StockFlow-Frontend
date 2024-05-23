export class CreateReportDTO {
  constructor(
    public userEmail: string,
    public itemName: string,
    public description: string
  ) {}
}
