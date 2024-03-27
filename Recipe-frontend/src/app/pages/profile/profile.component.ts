import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/login-details';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';

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
      id: -1,
      name: "",
      email: ""
    }
  }

  getUser() {
    this.auth.getUser2().subscribe(res => {
      console.log(res[0]);
      this.user = res[0];
    })
  }
}
