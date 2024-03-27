import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  data = [
    {recept: "recept 1", 
    ingredienser: 5,
    description: "Gör så här"},
    {recept: "recept 2", 
    ingredienser: 3,
    description: "Gör så här"},
    {recept: "recept 3", 
    ingredienser: 8, 
    description: "Gör så här"},
    {recept: "recept 4", 
    ingredienser: 11, 
    description: "Gör så här"},
    {recept: "recept 5", 
    ingredienser: 4, 
    description: "Gör så här"},
  ];
}
