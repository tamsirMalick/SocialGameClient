import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  formLogin: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm();
  }


  loginForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  loginUser() {
    if (this.formLogin.invalid) {
      this.errorMessage = 'Email or password is incorrect';
    }
    this.userService.login(this.email.value, this.password.value).subscribe(
      data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigateByUrl('/subscribe');
      },
      error => {
        if (error.status === 404) {
          this.errorMessage = 'Aucun utilisateur trouvé';
        }
        if (error.status === 400) {
          this.errorMessage = 'Email ou mot de passe invalide';
        }
      }
    );
  }

  ngOnInit() {
  }

}
