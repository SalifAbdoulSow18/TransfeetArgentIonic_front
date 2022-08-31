import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ListSiegeService} from '../../services/list-siege.service';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.page.html',
  styleUrls: ['./tarif.page.scss'],
})
export class TarifPage implements OnInit {
  infoTarifs: any;
  constructor(private tarif: ListSiegeService,
              private router: Router) {
    this.tarif.myTarif().subscribe(data => {
      // console.log(data);
      this.infoTarifs = data ;
    }) ;
  }

  ngOnInit() {
  }

}
