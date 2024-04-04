import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {

  id?: string;
  recipe: any;

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
      if (this.id) {
        // hämtar receptet baserat på id
        console.log(this.id);
        this.loadRecipe(this.id);
      }
    });
  }
  
  loadRecipe(id: string) {
    console.log('Load recipe method called with id:', id);
    this.recipeService.getRecipe(id).subscribe({
      next: (data) => {
        console.log('Recieved recipe data:', data);
        this.recipe = data;
      },
      error: (error) => {
        console.error('Error fetching recipe:', error);
      }
    });
  }
}
