import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipesearchComponent } from './pages/recipesearch/recipesearch.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'recipes', component: RecipesComponent},
    {path: 'search', component: RecipesearchComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [authGuard]}
];
