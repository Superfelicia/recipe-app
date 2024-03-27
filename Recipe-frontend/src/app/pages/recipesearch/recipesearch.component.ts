import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipesearch',
  standalone: true,
  imports: [],
  templateUrl: './recipesearch.component.html',
  styleUrl: './recipesearch.component.scss'
})
export class RecipesearchComponent {

  recipes?: any;

  constructor(private recipeService: RecipeService) { }

  searchRecipe() {
    this.recipeService.getRecipes("chicken").subscribe(res => {
      console.log(res);
      this.recipes = res;

      let recipeArray: any[];
      recipeArray = this.recipes.hits;
      console.log(recipeArray);

      let recipes = recipeArray.map(item => {
        return {
          self: item._links.self.href,
          label: item.recipe.label,
          image: item.recipe.image,
          totalTime: item.recipe.totalTime,
          ingredientLines: item.recipe.ingredientLines,
        }
      });
    console.table(recipes);
    this.recipes = recipes;
    });
  }
}
