import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RecipeidformatterPipe } from '../../pipes/recipeidformatter.pipe';
import { CommonModule } from '@angular/common';
import { RecipesearchComponent } from '../recipesearch/recipesearch.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, RecipeidformatterPipe, CommonModule, RecipesearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // recipes?: Recipe[];
  recipes: any;

  searchterm: any;
  // cuisineType = "";
  // mealType = "";
  // healthLabel = "";

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.showRecipes();
  }

  navigateToSearch() {
    console.log('förbereder att navigera till sök..');
    this.router.navigate(['/search']);
  }

  showRecipes() {
    this.recipeService.getAllRecipes(this.searchterm).subscribe(res => {
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
