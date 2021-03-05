import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../../services/authentification.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  myData: boolean;
  constructor() {
    // Pour l'affichage des commissions
    if (localStorage.getItem('role') === 'ROLE_AdminAgence') {
      this.myData = true;
    } else  {
      this.myData = false;
    }
  }

  ngOnInit() {}

}
