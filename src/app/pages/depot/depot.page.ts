import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  hide = false;
  cni = '';
  nomComplet1 = '';
  nomComplet2 = '';
  telephone1 = '';
  telephone2 = '';
  montant = '';
  total: any;
  frais: any;
  donne: any;
  myForm: any = FormGroup ;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              public alertController: AlertController,
              private transactionService: TransactionsService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      cni: ['', [ Validators.required]],
      nomComplet1: ['', [ Validators.required]],
      nomComplet2: ['', [ Validators.required]],
      telephone1: ['', [ Validators.required]],
      telephone2: ['', [ Validators.required]],
      montant: ['', [ Validators.required]],
    });
  }

  // remplissage par defaut des champs frais et total
  InfoDepot($event: Event) {
    const auto = {
      montant: this.montant
    };
    this.transactionService.calculFrais(auto).subscribe( reponse => {
     // @ts-ignore
      if (this.montant !== '' && this.montant >= 1000 ) {
       this.frais = reponse;
       this.total = +this.montant - (+this.frais);
     } else {
       this.total = 0; this.frais = 0;
      }
    });
  }

  get f(): any {
    return this.myForm.controls;
  }
  ShowAndHide(data: any)
  {
    // tslint:disable-next-line:triple-equals
    this.hide = data != 1;
  }

  // ma fonction pour le depot
  async onSubmit() {
    this.submitted = true;
    const formValue = this.myForm.value ;
    // console.log(formValue);
    const infoDepot = {
        CNI: formValue.cni,
        nomComplet: formValue.nomComplet1,
        phone: formValue.telephone1
      };
    const infoRetrait =  {
        nomComplet: formValue.nomComplet2,
        phone: formValue.telephone2
      };
    const myDepot = {
      montant: formValue.montant,
      clientRetrait: infoRetrait,
      clientDepot : infoDepot,
    };
    // console.log(myDepot);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `EMETTEUR <br> <strong>${formValue.nomComplet1}</strong> <br>
                TELEPHONE <br> <strong>${formValue.telephone1}</strong> <br>
                N°CNI <br> <strong>${formValue.cni}</strong> <br>
                MONTANT <br> <strong>${formValue.montant}</strong>fcfa <br>
                RECEPTEUR <br> <strong>${formValue.nomComplet2}</strong> <br>
                TELEPHONE <br> <strong>${formValue.telephone2}</strong> `,
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
            this.transactionService.transactionDepot(myDepot).subscribe(async reponse => {
              this.donne = reponse.data;
              console.log(this.donne);
              const conf = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Transfert réussi',
                subHeader: 'Vous avez envoyé: ' + this.donne.montant +
                  ' à ' + formValue.nomComplet2 + ' le ' + this.donne.dateDepot,
                message: `CODE DE TRANSACTION  <br> <strong>${this.donne.codeTransaction}</strong> `,
                buttons: ['OK']
              });

              await conf.present();
              }, async (error) => {
              const erreur = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Erreur',
                message: 'Reverifiez vos données.',
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
