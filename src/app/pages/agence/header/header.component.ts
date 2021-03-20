import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../../services/authentification.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TransactionsService} from '../../../services/transactions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  montant: any;
  myData: boolean;
  constructor(private authService: AuthentificationService, private router: Router, private transaction: TransactionsService) {

    this.transaction.montantCompte().subscribe( data => {
      this.montant = data;
    });
    // Pour l'affichage des commissions et toutes les transactions
    if (localStorage.getItem('role') === 'ROLE_AdminAgence') {
      this.myData = true;
    } else  {
      this.myData = false;
    }
  }

  ngOnInit() {
    // refresh table
    this.transaction.refresNeeded$.subscribe(() => {
      this.transaction.montantCompte().subscribe( data => {
        this.montant = data;
      });
    });
    this.transaction.montantCompte().subscribe( data => {
      this.montant = data;
    });
  }
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
