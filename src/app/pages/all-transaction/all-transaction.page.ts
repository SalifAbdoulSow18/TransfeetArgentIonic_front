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
  total: any;
  constructor(private transaction: TransactionsService) {
    this.transaction.AllTransaction().subscribe(data => {
      // console.log(data);
      this.infoTransactions = data ;
      this.total = 0;
      for (const tran of this.infoTransactions) {
        this.total += tran.montant;
      }
    }) ;
  }

  ngOnInit() {
    // refresh table
    this.transaction.refresNeeded$.subscribe(() => {
      this.transaction.AllTransaction().subscribe( data => {
        this.infoTransactions = data;
      });
    });
    this.transaction.AllTransaction().subscribe( data => {
      this.infoTransactions = data;
    });
  }

}
