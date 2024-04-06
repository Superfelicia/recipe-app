import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/login-details';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginDetails: LoginDetails;

  form?: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginDetails = {
      email: '',
      password: '',
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.form?.valid) {
      this.loginDetails.email = this.form?.value.email;
      this.loginDetails.password = this.form?.value.password;
      
      this.auth.loginUser(this.loginDetails).subscribe(
        () => {
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Inloggning misslyckades:', error)
        }
      );
    }
  }

  logout() {
    this.auth.logOut();
  }

}
