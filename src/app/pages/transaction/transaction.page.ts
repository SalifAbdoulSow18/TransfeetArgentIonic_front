import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  myUser: any;
infoTransactions: any;
  constructor(private transaction: TransactionsService,
              private router: Router) {
    this.myUser = (localStorage.getItem('id'));
    this.transaction.myTransaction(this.myUser).subscribe(data => {
      console.log(data);
      this.infoTransactions = data ;
    }) ;
  }

  ngOnInit() {
  }

}
