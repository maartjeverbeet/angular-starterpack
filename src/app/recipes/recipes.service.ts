import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Recipe } from '../recipes/recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private recipes: Recipe[];

  constructor(private slService: ShoppingListService, private http: Http) {}

  getRecipe(index: string) {
    return this.http.get(environment.serverUrl + '/recipes/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Recipe;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getRecipes() {
    return this.http.get(environment.serverUrl + '/recipes', { headers: this.headers })
      .toPromise()
      .then(response => {
        this.recipes = response.json() as Recipe[];
        return response.json() as Recipe[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }


  addRecipe(recipe: Recipe) {
    this.http.post(environment.serverUrl + '/recipes', recipe , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.recipesChanged.next(this.recipes.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateRecipe(index: string, newRecipe: Recipe) {
    this.http.put(environment.serverUrl + '/recipes/' + index, newRecipe , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.recipesChanged.next(this.recipes.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteRecipe(index: string) {
    this.http.delete(environment.serverUrl + '/recipes/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.recipesChanged.next(this.recipes.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
