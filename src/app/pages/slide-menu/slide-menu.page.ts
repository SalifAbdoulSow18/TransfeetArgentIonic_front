import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {AuthentificationService} from '../../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.page.html',
  styleUrls: ['./slide-menu.page.scss'],
})
export class SlideMenuPage implements OnInit {
  myData: boolean;

  constructor(private authService: AuthentificationService, private router: Router) {
    // Pour l'affichage des commissions
    if (localStorage.getItem('role') === 'ROLE_AdminAgence') {
      this.myData = true;
    } else  {
      this.myData = false;
    }
  }

  ngOnInit() {}
  deconnexion() {
    Swal.fire({
      title: 'Are you sure to disconnect?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disconnect!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout() ;
        this.router.navigate(['/login']) ;
      }
    });
  }
}
