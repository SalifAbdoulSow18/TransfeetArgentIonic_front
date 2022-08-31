import { Component, OnInit } from '@angular/core';
import {ListSiegeService} from '../../services/list-siege.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-list-agence',
  templateUrl: './list-agence.page.html',
  styleUrls: ['./list-agence.page.scss'],
})
export class ListAgencePage implements OnInit {
  infoComptes: any;
  constructor(private compte: ListSiegeService,
              private router: Router, public alertController: AlertController) {
    this.compte.myCompte().subscribe(data => {
      console.log(data);
      this.infoComptes = data ;
    }) ;
  }

  ngOnInit() {
    // refresh table
    this.compte.refresNeeded$.subscribe(() => {
      // tslint:disable-next-line:no-unused-expression
      this.compte.myCompte().subscribe(data => {
        this.infoComptes = data ;
      }) ;
    });
    this.compte.myCompte().subscribe(data => {
      this.infoComptes = data ;
    }) ;
  }

  async removeCompte(id) {
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'La suppression de cet agence entrainera la suppression du compte et des utilisateurs!',
      message: `Voulez vous supprimer?`,
      buttons: [
        {
          text: 'annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'oui',
          handler: () => {
            this.compte.deleteCompte(id).subscribe(  async data => {
              // console.log(data);
              const info = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Information',
                message: 'Agence supprimé avec succès',
                buttons: ['OK']
              });

              await info.present();
            });
            // console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
