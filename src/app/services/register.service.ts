import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  message: string | undefined;
  userId = null;

  constructor(private http: HttpClient) { }

  public registrarUsuario(email: string, password: string, dni: string, name: string, lastname: string, phone: string, opcion:string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    return this.http.post(environment.api + "register", { 'email': email, 'password': password, 'dni': dni, 'name': name, 'lastname': lastname, 'phone': phone, 'opcion': opcion }, { headers: headers });
  }
}
