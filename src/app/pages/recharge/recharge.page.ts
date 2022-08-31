import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
import {AlertController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {ListSiegeService} from '../../services/list-siege.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  tarif: any;
  nomAgence = '';
  idCompte: any;
  choiseAgence: any;
  constructor(private rechargement: ListSiegeService, public alertController: AlertController) {
    this.rechargement.myCompte().subscribe(data => {
      console.log(data);
      this.choiseAgence = data ;
    }) ;
  }

  ngOnInit() {
  }
  InfoDepot(name: any) {
    const myId = {
      nomAgence: name
    };
    // console.log(myCode);
    this.rechargement.retourId(myId).subscribe(response => {
      // console.log(response);
      this.idCompte = response;
    });
  }
  async presentAlert(depot: NgForm) {
    const myMontant = {
      montantDepot: depot.value.montant
    };

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `Voulez vous envoyer <strong>${depot.value.montant}</strong>
                à l'agence <br> <strong>${this.nomAgence}</strong>?`,
      buttons: [
        {
          text: 'annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.rechargement.rechargeCompte(myMontant, this.idCompte).subscribe(async reponse => {
              this.tarif = reponse;
              const conf = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Calculateur',
                subHeader: 'transfert réussi ',
                message: 'Vous avez envoyé ' + depot.value.montant + ' à l\'agence' + this.nomAgence,
                buttons: ['OK']
              });

              await conf.present();
              {
                depot.reset();
              }
            }, async (error) => {
              const erreur = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Erreur',
                message: 'Reverifiez les données!!!',
                buttons: ['OK']
              });

              await erreur.present();
            });
            // console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
