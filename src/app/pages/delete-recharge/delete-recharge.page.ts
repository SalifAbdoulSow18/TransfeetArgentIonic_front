import { Component, OnInit } from '@angular/core';
import {ListSiegeService} from '../../services/list-siege.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-delete-recharge',
  templateUrl: './delete-recharge.page.html',
  styleUrls: ['./delete-recharge.page.scss'],
})
export class DeleteRechargePage implements OnInit {
  infoDepots: any;
  constructor(private listDepot: ListSiegeService, public alertController: AlertController) {
    this.listDepot.myListDepot().subscribe(data => {
      console.log(data);
      this.infoDepots = data ;
    }) ;
  }

  ngOnInit() {
    // refresh table
    this.listDepot.refresNeeded$.subscribe(() => {
      // tslint:disable-next-line:no-unused-expression
      this.listDepot.myListDepot().subscribe(data => {
        this.infoDepots = data ;
      }) ;
    });
    this.listDepot.myListDepot().subscribe(data => {
      this.infoDepots = data ;
    }) ;
  }

  async AnnulerDepot() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `Voulez vous vraiment annuler le depot?`,
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
            this.listDepot.annulerRecharge().subscribe(  async data => {
              console.log(data);
              const info = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Information',
                message: data,
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
