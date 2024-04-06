import { Component } from '@angular/core';
import { Registerdetails } from '../../interfaces/registerdetails';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerDetails: Registerdetails;

  form?: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
    this.registerDetails = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  registerUser() {
    if (this.form?.valid) {
      this.registerDetails.name = this.form.value.name;
      this.registerDetails.email = this.form.value.email;
      this.registerDetails.password = this.form.value.password;
      this.registerDetails.password_confirmation = this.form.value.password_confirmation;

      this.auth.registerNewUser(this.registerDetails).subscribe(
        () => {
          this.auth.loginUser(this.registerDetails).subscribe(
            () => {
              this.router.navigate(['/profile']);
            },
            (error) => {
              console.error('Inloggning misslyckades', error);
            }
          );
        },
        (error) => {
          console.error('Registrering misslyckades:', error);
        }
      );
    }
  }
}
