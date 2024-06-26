import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';
import { LoggedInUser } from './interfaces/loggedinuser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Recipe-frontend';
  name = 'Fellan';

  user?: User;

  loggedIn$: Observable<LoggedInUser>;

  constructor(private auth: AuthService) {
    this.loggedIn$ = this.auth.loggedIn$;
  }
}
