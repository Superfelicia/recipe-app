import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/login-details';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginDetails: LoginDetails;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'fell@fell.fell',
      password: 'fellfellfell',
    };
  }

  login() {
    this.auth.loginUser(this.loginDetails);
  }

  logout() {
    this.auth.logOut();
  }

}
