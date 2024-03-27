import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginDetails } from './interfaces/login-details';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';

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

  loginDetails: LoginDetails;

  loggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email:"fell@fell.fell",
      password:"fellfellfell"
    }

    this.user = {
      id: 11,
      name: "Fell",
      email: "fell@fell.fell"
    }

    this.loggedIn$ = this.auth.loggedIn$;
  }

  login() {
    this.auth.loginUser(this.loginDetails);
  }

  logout() {
    this.auth.logOut();
  }
}
