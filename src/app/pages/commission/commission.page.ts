import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  myUser: any;
  infoTransactions: any;
  constructor(private transaction: TransactionsService,
              private router: Router) {
    this.myUser = (localStorage.getItem('id'));
    this.transaction.myTransaction(this.myUser).subscribe(data => {
      this.infoTransactions = data ;
      console.log(this.infoTransactions);
    }) ;
  }

  ngOnInit() {
  }

}
