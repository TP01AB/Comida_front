import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: any;
  user: any;

  constructor(private http: HttpClient) { }

  public login = (email: string, password: string) => {
    const url = environment.api + "login";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, { 'email': email, 'password': password }, { headers: headers });
  }
  public isUserSigned(): boolean {
    let iniciado = false;
    let aux: any | null;
    aux = {
      access_token: "",
      email:""
    }
    if (!_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY))) {
      iniciado = true;
      aux = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
      aux = JSON.parse(aux);
      this.user = aux;
    }
    return iniciado;
  }
}
