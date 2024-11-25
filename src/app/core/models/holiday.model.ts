export class Holiday {
  public isEdit?: boolean;

  constructor(
    public id: string,
    public description: string,
    public date: Date,
    public isRecurrent: boolean
  ) {}
}
