import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(public http: HttpClient) { }

  getAllTRansactions(): any{
    return this.http.get(`http://localhost:8000/api/transaction`) // A ameliorer
      .pipe(map(resp => resp));
  }
}
