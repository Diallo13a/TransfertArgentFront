import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../depot/transaction.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetraitService {

  constructor(public http: HttpClient) { }

  get(code: any){
    return this.http.get<[Transaction]>('http://localhost:8000/api/transaction/' + code);
  }

  retirer( code: string){
    // @ts-ignore
    return this.http.get('http://localhost:8000/api/recupTransaction/' + code );
  }

}
