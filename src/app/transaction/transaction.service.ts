import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http: HttpClient) { }

  getAllTRansactions(): any{
    return this.http.get(`http://localhost:8000/api/transaction`) // A ameliorer
      .pipe(map(resp => resp));
  }
}
