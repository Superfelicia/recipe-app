import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getRecipes(searchterm = "Chicken", cuisineType = "British", mealType = "Dinner"): Observable<any> {
    let url = this.baseUrl + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key + "&cuisineType=" + cuisineType + "&mealType=" + mealType;
    
    return this.http.get<any>(url, this.httpOptions);
  }
}
