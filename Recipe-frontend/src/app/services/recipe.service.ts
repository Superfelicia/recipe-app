import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = `https://api.edamam.com/api/recipes/v2?type=public`;
  private app_id = "ff2f13d3";
  private app_key = "60e2bc4dbe5152760e523f5deb1094e8";

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
    let url = this.baseUrl + "&app_id=" + this.app_id + "&app_key=" + this.app_key;
    
    let queryParams = '';

    if (searchterm) {
      queryParams += `$q=${encodeURI(searchterm)}`;
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

    return this.http.get<any>(`${url}${queryParams}`, this.httpOptions);
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
