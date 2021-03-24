import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Transaction} from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(public http: HttpClient) { }

  saveDepot(transaction: Transaction): any{
    return this.http.post('http://localhost:8000/api/useragence/depot/client', transaction).pipe(map(resp => resp));
  }
}
