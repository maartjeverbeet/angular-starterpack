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
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: Http) {}

  getRecipes() {
    return this.http.get(environment.serverUrl + '/recipes', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Recipe[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getRecipe(index: number) {
    return this.http.get(environment.serverUrl + '/recipes/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Recipe;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.http.post(environment.serverUrl + '/recipes', { recipe }, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.http.put(environment.serverUrl + '/recipes/' + index, { newRecipe }, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteRecipe(index: number) {
    this.http.delete(environment.serverUrl + '/recipes/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
