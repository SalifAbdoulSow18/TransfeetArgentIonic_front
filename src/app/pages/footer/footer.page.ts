import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  myAdminAgence: boolean;
  myUserAgence: boolean;
  myAdminSystem: boolean;
  myCaissier: boolean;
  constructor() {
    // Pour l'affichage des tabs
    if (localStorage.getItem('role') === 'ROLE_AdminAgence') {
      this.myAdminAgence = true;
    }
    if (localStorage.getItem('role') === 'ROLE_UserAgence') {
      this.myUserAgence = true;
    }
    if (localStorage.getItem('role') === 'ROLE_AdminSystem') {
      this.myAdminSystem = true;
    }
    if (localStorage.getItem('role') === 'ROLE_Caissier') {
      this.myCaissier = true;
    }
  }

  ngOnInit() {}

}
