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
  public registerUser(jsonFather: string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log(jsonFather);

    return this.http.post(environment.api + "register", jsonFather, { headers: headers });
  }
}
