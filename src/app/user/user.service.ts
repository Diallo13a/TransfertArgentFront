import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  getUser(id: number): any{
    return this.http.get('http://127.0.0.1:8000/api/admin/users/' + id)
      .pipe(map(resp => resp));
  }
}
