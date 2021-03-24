import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './login/user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'http://localhost:8000/api/login';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {
    return this.http.post(`${this.baseUrl}`, {
      username, password
    }).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCompteByAgence(id: any): any{
    return this.http.get('http://localhost:8000/api/compte/' + id + '/agence') // A ameliorer
      .pipe(map(resp => resp));
  }
  // getToken(): string{
  //   const token = localStorage.getItem('token');
  //   if ( token !== 'undefined'){
  //     return token;
  //   }else {
  //     return null;
  //   }
  // }
  // public getToken(): string {
  //   return localStorage.getItem('token');
  // }

}
