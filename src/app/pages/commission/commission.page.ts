import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  total: any;
  infoTransactions: any;
  constructor(private transaction: TransactionsService,
              private router: Router) {
    this.transaction.AllTransaction().subscribe(data => {
      this.infoTransactions = data ;
      this.total = 0;
      for (const tran of this.infoTransactions) {
        this.total += tran.fraisEnvoi;
      }
      // console.log(this.total);
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
