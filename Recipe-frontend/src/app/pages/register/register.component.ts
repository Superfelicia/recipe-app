import { Component } from '@angular/core';
import { Registerdetails } from '../../interfaces/registerdetails';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerDetails: Registerdetails;

  constructor(private auth: AuthService) {
    this.registerDetails = {
      name: 'felly',
      email: 'felly@felly.se',
      password: 'felly123',
      password_confirmation: 'felly123',
    }
  }

  registerUser() {
    this.auth.registerNewUser(this.registerDetails);
  }

}
