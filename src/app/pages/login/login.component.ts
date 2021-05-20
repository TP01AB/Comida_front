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
  isEmail = /\S+@\S+\.\S+/;
  user: any;
  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
    this.FormLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.min(8)]]
    });
    this.user = {
      token: "",
      user_id: "",
      rol: "",
      email: "",
      nombre: "",
      apellidos: "",
      telefono: "",
      direccion: ""
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
        this.user.rol = response.message.user.rol_id;
        this.user.user_id = response.message.user.id;
        this.user.nombre = response.message.user.name;
        this.user.apellidos = response.message.user.lastname;
        this.user.telefono = response.message.user.phone;
        this.user.direccion = response.message.user.address;
        if (this.user.rol === 1) { this.message = "Inicio correcto eres admin"; }
        if (this.user.rol === 2) { this.message = "Inicio correcto eres restaurante"; }
        if (this.user.rol === 3) { this.message = "Inicio correcto eres repartidor"; }
        if (this.user.rol === 4) { this.message = "Inicio correcto eres cliente"; }

        sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        console.log(this.user);

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error in login");
        } else {
          console.log("Server-side error in login");
        }
      }
    );
  }
  get form() { return this.FormLogin.controls; }

}
