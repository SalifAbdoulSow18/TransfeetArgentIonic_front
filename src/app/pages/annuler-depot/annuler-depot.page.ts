import { Component, OnInit } from '@angular/core';
import {ListSiegeService} from '../../services/list-siege.service';
import {AlertController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-annuler-depot',
  templateUrl: './annuler-depot.page.html',
  styleUrls: ['./annuler-depot.page.scss'],
})
export class AnnulerDepotPage implements OnInit {
  constructor(private listDepot: ListSiegeService, public alertController: AlertController) {
  }

  ngOnInit() {}

  async presentAlert(annulation: NgForm) {
    const myCode = {
      codeTransaction: annulation.value.code
    };
    console.log(myCode);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `Voulez vous vraiment annuler le depot?`,
      buttons: [
        {
          text: 'non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'oui',
          handler: () => {
            this.listDepot.annulerDepot(myCode).subscribe(async data => {
              console.log(data);
              const info = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Information',
                message: data,
                buttons: ['OK']
              });

              await info.present();
              {
                annulation.reset();
              }
            });
            // console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
