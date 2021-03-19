import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../../services/authentification.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  myData: boolean;
  constructor(private authService: AuthentificationService, private router: Router) {
    // Pour l'affichage des commissions et toutes les transactions
    if (localStorage.getItem('role') === 'ROLE_AdminSystem') {
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
