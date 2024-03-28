import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesearchComponent } from './pages/recipesearch/recipesearch.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'recipe/:id', component: RecipeComponent},
    {path: 'search', component: RecipesearchComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard]}
];
