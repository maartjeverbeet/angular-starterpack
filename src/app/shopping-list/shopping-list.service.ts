import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private ingredients: Ingredient[] = [];

  constructor(private http: Http) {
    this.http.get(environment.serverUrl + '/ingredients', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.ingredients = response.json() as Ingredient[];
      })
      .catch(error => {
        this.ingredients = [new Ingredient('Error', 0)];
        return this.handleError(error);
      });
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.http.post(environment.serverUrl + '/ingredients', ingredient , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let i = 0; i < ingredients.length; i++) {
      this.addIngredient(ingredients[i]);
    }
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.http.put(environment.serverUrl + '/ingredients/' + index, newIngredient , { headers: this.headers })
      .toPromise()
      .then(response => {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });

  }

  deleteIngredient(index: number) {
    this.http.delete(environment.serverUrl + '/ingredients/' + index, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
