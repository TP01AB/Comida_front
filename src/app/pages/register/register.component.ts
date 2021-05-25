import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  FormRegister!: FormGroup;
  message: any;
  submitted = false;
  private isName = "^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$"
  private isDni = "^[0-9]{8,8}[A-Za-z]$"
  private isPhone = "^[67]\\d{8}$$"
  private isCp = "^[0-9]{5}$";

  constructor(private formBuilder: FormBuilder, private registerUser: RegisterService, public router: Router) { }
  ngOnInit() {
    this.initForm();
  }

  onSubmit() { }

  initForm() {

    this.FormRegister = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dni: ['', [Validators.required, Validators.pattern(this.isDni)]],
      name: ['', [Validators.required, Validators.pattern(this.isName)]],
      lastname: ['', [Validators.required, Validators.pattern(this.isName)]],
      telefono: ['', [Validators.required, Validators.pattern(this.isPhone)]],
      cp: ['', [Validators.required, Validators.pattern(this.isCp)]],
      localidad: ['', Validators.required],
      direccion: ['', Validators.required],
      birthday: ['', Validators.required],
      opcion: ['', Validators.required]
    });
  }
  isValidField(field: string): string {
    const validatedField = this.FormRegister.get(field);
    return (validatedField!.valid && validatedField!.touched)
      ? 'is-invalid' : validatedField!.touched ? 'is-valid' : '';
  }

  get form() { return this.FormRegister.controls; }
}
