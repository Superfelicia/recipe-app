import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeidformatterPipe } from '../../pipes/recipeidformatter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipesearch',
  standalone: true,
  imports: [FormsModule, RouterLink, RecipeidformatterPipe],
  templateUrl: './recipesearch.component.html',
  styleUrl: './recipesearch.component.scss',
})
export class RecipesearchComponent implements OnInit {
  recipes?: Recipe[];

  searchterm?: string;
  cuisineType?: string;
  mealType?: string;
  healthLabel?: string;


  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      if (url[0].path === 'search') {
        this.searchRecipe();
      }
    })
  }

  searchRecipe() {
    if (!this.recipes || this.recipes.length === 0) {
          this.recipeService.getRecipes(this.searchterm, this.cuisineType, this.mealType, this.healthLabel).subscribe((res) => {
      console.log(res);
      let recipes: Recipe[];

      recipes = res.hits.map((item: { recipe: { label: any; image: any; ingredientLines: any; totalTime: any; healthLabels: any; }; _links: { self: { href: any; }; }; }) => {
        return {
          label: item.recipe.label,
          image: item.recipe.image,
          totalTime: item.recipe.totalTime,
          ingredientLines: item.recipe.ingredientLines,
          selfref: item._links.self.href,
          healthLabels: item.recipe.healthLabels,
        }
      });

      console.table(recipes);
      this.recipes = recipes;
    });
    }
  }
}
