import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-transaction',
  templateUrl: './all-transaction.page.html',
  styleUrls: ['./all-transaction.page.scss'],
})
export class AllTransactionPage implements OnInit {
  infoTransactions: any;
  constructor(private transaction: TransactionsService,
              private router: Router) {
    this.transaction.AllTransaction().subscribe(data => {
      // console.log(data);
      this.infoTransactions = data ;
    }) ;
  }

  ngOnInit() {
  }

}
