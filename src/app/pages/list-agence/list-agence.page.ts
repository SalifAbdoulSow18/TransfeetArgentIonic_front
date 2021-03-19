import { Component, OnInit } from '@angular/core';
import {ListSiegeService} from '../../services/list-siege.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-agence',
  templateUrl: './list-agence.page.html',
  styleUrls: ['./list-agence.page.scss'],
})
export class ListAgencePage implements OnInit {
  infoComptes: any;
  constructor(private compte: ListSiegeService,
              private router: Router) {
    this.compte.myCompte().subscribe(data => {
      console.log(data);
      this.infoComptes = data ;
    }) ;
  }

  ngOnInit() {
  }

}
