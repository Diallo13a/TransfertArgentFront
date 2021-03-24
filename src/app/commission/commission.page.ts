import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransactionService} from '../transaction/transaction.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  pageTransaction: any;
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
