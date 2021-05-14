import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  FormRegister: FormGroup;
  message: any;
  submitted = false;
  isEmail = /\S+@\S+\.\S+/;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.FormRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.min(8)]]
    });
   }

  ngOnInit(): void {
  }

  onSubmit() { }
  get form() { return this.FormRegister.controls; }
}
