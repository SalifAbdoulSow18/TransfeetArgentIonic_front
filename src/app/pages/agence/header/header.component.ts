import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  myData: boolean;
  constructor(private authService: AuthentificationService, private router: Router) {
    // Pour l'affichage des commissions et toutes les transactions
    if (localStorage.getItem('role') === 'ROLE_AdminAgence') {
      this.myData = true;
    } else  {
      this.myData = false;
    }
  }

  ngOnInit() {}
  deconnexion() {
        this.authService.logout() ;
        this.router.navigate(['/home']) ;
  }

}
