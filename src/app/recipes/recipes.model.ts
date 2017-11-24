import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public _id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(name: string, _id: number, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this._id = _id;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
