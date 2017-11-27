import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  private id: string;
  private _name: string;
  private _description: string;
  private _imagePath: string;
  private _ingredients: Ingredient[];

}
