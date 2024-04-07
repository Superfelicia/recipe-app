import { Component, HostListener, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeidformatterPipe } from '../../pipes/recipeidformatter.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipesearch',
  standalone: true,
  imports: [FormsModule, RouterLink, RecipeidformatterPipe, CommonModule],
  templateUrl: './recipesearch.component.html',
  styleUrl: './recipesearch.component.scss',
})
export class RecipesearchComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes?: Recipe[];

  searchterm: string = '';

  mealTypes: string[] = ['breakfast', 'brunch', 'lunch', 'dinner', 'snack', 'teatime'];
  cuisineTypes: string[] = ["italian", "mexican", "indian", "chinese", 'british', 'greek', 'eastern europe', 'mediterranean'];
  healthLabels: string[] = ["vegetarian", "vegan", 'shellfish-free', 'dairy-free', 'gluten-free', 'pescatarian', 'peanut-free', 'egg-free'];
  selectedMealTypes: string[] = [];
  selectedCuisineTypes: string[] = [];
  selectedHealthLabels: string[] = [];

  isDropdownOpen: boolean = false;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['.'], {relativeTo: this.route});
    this.route.url.subscribe(url => {
      if (url[0] !== undefined && url[0].path === 'search') {
        this.searchRecipe();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const menuButton = document.getElementById('menu-button');

    if (menuButton?.contains(event.target as Node) && !this.isDropdownOpen) {
      this.toggleDropdown(event);
    }

    if (!dropdownMenu?.contains(event.target as Node) && this.isDropdownOpen) {
      this.closeDropdown();
    }

    // if (dropdownMenu?.contains(event.target as Node)) {
    //   event.stopPropagation();
    //   this.isClickInsideDropdown(dropdownMenu);
    // }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    console.log('Klickar på dropdown');
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  isClickInsideDropdown(target: HTMLElement): boolean {
    const dropdownMenu = document.getElementById('dropdown-menu');
    // console.log('klickar inuti dropdown');
    return !!dropdownMenu && dropdownMenu.contains(target);
  }

  toggleMealType(event: any): void {
    if (event.target) {
      const type = event.target.value;
      if (event.target.checked) {
        this.selectedMealTypes.push(type);
      } else {
        const index = this.selectedMealTypes.indexOf(type);
        if (index !== -1) {
          this.selectedMealTypes.splice(index, 1);
        }
      }
      this.filterRecipes();
    }
  }
  
  toggleCuisineType(event: any): void {
    if (event.target) {
      const type = event.target.value;
      if (event.target.checked) {
        this.selectedCuisineTypes.push(type);
      } else {
        const index = this.selectedCuisineTypes.indexOf(type);
        if (index !== -1) {
          this.selectedCuisineTypes.splice(index, 1);
        }
      }
      this.filterRecipes();
    }
  }
  
  toggleHealthLabel(event: any): void {
    if (event.target) {
      const label = event.target.value;
      if (event.target.checked) {
        this.selectedHealthLabels.push(label);
      } else {
        const index = this.selectedHealthLabels.indexOf(label);
        if (index !== -1) {
          this.selectedHealthLabels.splice(index, 1);
        }
      }
      this.filterRecipes();
    }
  }
 
  searchRecipe() {
    let searchterm: string = this.searchterm && this.searchterm.trim() !== '' ? this.searchterm.trim() : '';
    
    this.recipeService.getRecipes(searchterm, this.selectedMealTypes.join(','), this.selectedCuisineTypes.join(', '), this.selectedHealthLabels).subscribe((res: any) => {
      console.log(res);
      this.recipes = res.hits.map((item: { recipe: { label: any; image: any; ingredientLines: any; totalTime: any; mealType: any; cuisineType: any; healthLabels: any; }; _links: { self: { href: any; }; }; }) => {
        return {
          label: item.recipe.label,
          image: item.recipe.image,
          totalTime: item.recipe.totalTime,
          ingredientLines: item.recipe.ingredientLines,
          selfref: item._links.self.href,
          mealType:item.recipe.mealType,
          cuisineType: item.recipe.cuisineType,
          healthLabels: item.recipe.healthLabels,
        }
      });

      console.table(this.filteredRecipes);
      this.filterRecipes();
    });
  }
  
  filterRecipes() {
    if (!this.recipes) {
      this.filteredRecipes = [];
      return;
    }
  
    this.filteredRecipes = this.recipes.filter(recipe => {
      // Filtrera baserat på valda mealTypes
      const mealTypeMatch = this.selectedMealTypes.length === 0 ||
        this.selectedMealTypes.some(type => recipe.mealType.includes(type));
  
      // Filtrera baserat på valda cuisineTypes
      const cuisineTypeMatch = this.selectedCuisineTypes.length === 0 ||
        this.selectedCuisineTypes.some(type => recipe.cuisineType.includes(type));
  
      // Filtrera baserat på valda healthLabels
      const healthLabelMatch = this.selectedHealthLabels.length === 0 ||
        this.selectedHealthLabels.some(label => recipe.healthLabels.includes(label));
  
      // Returnera true om receptet matchar alla valda kriterier
      return mealTypeMatch && cuisineTypeMatch && healthLabelMatch;
    });
  }
}
