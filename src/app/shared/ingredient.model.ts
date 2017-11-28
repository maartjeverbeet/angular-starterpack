export class Ingredient {
  public name: string;
  public amount: number;
  public _id: string;
  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
