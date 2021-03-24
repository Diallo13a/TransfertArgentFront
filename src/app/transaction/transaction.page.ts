import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TransactionService} from './transaction.service';
import {Transaction} from '../depot/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  pageTransaction: any;
  transaction: Transaction[] = [];
  key = 'id';
  reverse = false;
  pg = 1;
  constructor(private http: HttpClient, public transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getAllTRansactions().pipe(map(resp => resp))
      .subscribe(data => {
        this.pageTransaction = data;
        // this.pageTransaction = this.pageTransaction['hydra:member'];
        console.log(this.pageTransaction);

      }, err => {
        console.log(err);
      });
  }

  sort(key: string) {
    this.key = key;
    this.reverse = ! this.reverse;
  }
}
