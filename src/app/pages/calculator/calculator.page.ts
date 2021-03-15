import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../../services/transactions.service';
import {NgForm} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  tarif: any;
  constructor(private transaction: TransactionsService, public alertController: AlertController) {}

  ngOnInit() {
  }
  async presentAlert(calculatrice: NgForm) {
    const myMontant = {
      montant: calculatrice.value.montant
    };
    this.transaction.calculFrais(myMontant).subscribe(async reponse => {
      this.tarif = reponse;
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Calculateur',
        subHeader: 'Pour une transaction de: ' + calculatrice.value.montant + ',',
        message: 'le frais est égal à: ' + this.tarif,
        buttons: ['OK']
      });

      await alert.present();
    });
  }
}
