import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: User;

  constructor(private auth: AuthService) {
    this.user = {
      id: 0,
      name: "",
      email: "",
      created_at: "",
    }
  }

  getUser() {
    this.auth.getCurrentUser();
  }
}
