import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
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
