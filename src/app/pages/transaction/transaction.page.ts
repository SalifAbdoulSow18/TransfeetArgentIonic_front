import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
infoTransactions: any;
  constructor(private transaction: TransactionsService,
              private router: Router) {
    this.transaction.myTransaction().subscribe(data => {
      this.infoTransactions = data ;
      console.log(this.infoTransactions);
    }) ;
  }

  ngOnInit() {
  }

}
