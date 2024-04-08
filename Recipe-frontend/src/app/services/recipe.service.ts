import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = `https://api.edamam.com/api/recipes/v2?type=public`;
  private app_id = process.env['API_ID'];
  private app_key = process.env['API_KEY'];

  private httpOptions = {
    headers: new HttpHeaders({
      'accept': 'application/json',
      'Accept-Language': 'en'
    })
  }

  constructor(private http: HttpClient) { }

  getAllRecipes(defaultQuery: string): Observable<any> {
    let url = this.baseUrl + "&q=" + defaultQuery + "&app_id=" + this.app_id + "&app_key=" + this.app_key;

    return this.http.get<any>(url, this.httpOptions);
  }

  getRecipes(searchterm: string, mealType: string, cuisineType: string, healthLabels: string[]): Observable<any> {    
    let queryParams = '';

    if (searchterm) {
      queryParams += `&q=${encodeURI(searchterm)}`;
    }
    if (mealType) {
      queryParams += `&mealType=${encodeURI(mealType)}`;
    }
    if (cuisineType) {
      queryParams += `&cuisineType=${encodeURI(cuisineType)}`;
    }
    if (healthLabels && healthLabels.length > 0) {
      const encodedHealthLabels = healthLabels.map(label => encodeURI(label));
      queryParams += `&health=${encodedHealthLabels.join(',')}`;
    }

    const url = `${this.baseUrl}${queryParams}&app_id=${this.app_id}&app_key=${this.app_key}`;

    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRecipe(recipeId: string): Observable<any> {
    let recipeUrl = `https://api.edamam.com/api/recipes/v2/`;
    let url = `${recipeUrl}${recipeId}?type=public&app_id=${this.app_id}&app_key=${this.app_key}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened: please try again later.'))
  }
}
