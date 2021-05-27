import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  FormLogin: FormGroup;
  message: any;
  submitted = false;
  user: any;
  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {

    this.FormLogin = this.formBuilder.group({
      email: ['',Validators.compose( [Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.user = {
      token: "",
      user_id: "",
      rol: "",
      email: "",
      nombre: "",
      apellidos: "",
      telefono: "",
    }
    this.message = "";
    if (this.loginService.isUserSigned()) { this.router.navigate(['/login']); } else { }
  }

  ngOnInit(): void {
  }

  onReset() {
    this.submitted = false;
    this.FormLogin.reset();
  }
  onSubmit() {
    this.submitted = true;
    let Data = this.FormLogin.value;
    const email = Data.email;
    const password = Data.password;

    this.onReset();

    this.loginService.login(email, password).subscribe(
      (response: any) => {

        this.user.token = response.message.access_token;
        this.user.email = response.message.user.email;
        this.user.rol = response.message.rol;
        this.user.user_id = response.message.user.id;
        this.user.nombre = response.message.user.name;
        this.user.apellidos = response.message.user.lastname;
        this.user.telefono = response.message.user.phone;
        if (this.user.rol === 1) { this.router.navigate(['/admin/inicio']); }
        if (this.user.rol === 2) { this.router.navigate(['/ac/inicio']);  }
        if (this.user.rol === 3) { this.router.navigate(['/restaurante/inicio']);  }
        if (this.user.rol === 4) { this.router.navigate(['/repartidor/inicio']);  }
        if (this.user.rol === 5) { this.router.navigate(['/inicio']);  }

        sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        console.log(this.user);

      },
      (error) => {
          this.message = error.error.message;
          console.log("Server-side error in login");
      }
    );
  }

  get form() { return this.FormLogin.controls; }


  isValidField(field: string): string {
    const validatedField = this.FormLogin.get(field);
    return (validatedField!.valid && validatedField!.touched)
      ? 'is-invalid' : validatedField!.touched ? 'is-valid' : '';
  }
}
