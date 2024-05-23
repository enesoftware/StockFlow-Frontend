export class UserDTO {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roleId: number
  ) {}
}
