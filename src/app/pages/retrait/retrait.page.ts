import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionsService} from '../../services/transactions.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  hide = false;
  donne: any;
  myForm: any = FormGroup ;
  code = '';
  nomComplet1 = '';
  nomComplet2 = '';
  montantRetrait = '';
  montantEnvoi = '' ;
  phone1 = '';
  phone2 = '';
  telephone = '';
  date = '';
  cni = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              public alertController: AlertController,
              private transaction: TransactionsService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      code: ['', [ Validators.required]],
      telephone: ['', [ Validators.required]]
    });
  }
  // affichage des info concernant un depot a travers son code de transaction
  InfoDepot($event: Event) {
    const myCode = {
      codeTransaction: this.code
    };
    // console.log(myCode);
    this.transaction.infoDepot(myCode).subscribe(response => {
      this.nomComplet1 = response.clientRetrait.nomComplet;
      this.nomComplet2 = response.clientDepot.nomComplet;
      this.cni = response.clientDepot.cNI;
      this.phone1 = response.clientRetrait.phone;
      this.phone2 = response.clientDepot.phone;
      this.date = response.dateDepot;
      this.montantEnvoi = response.montant;
      this.montantRetrait = response.montantRetrait;
      console.log(response);
    });
  }
  // les buttons emetteur et beneficiaire
  ShowAndHide(data: any)
  {
    // tslint:disable-next-line:triple-equals
    this.hide = data != 1;
  }
  get f(): any {
    return this.myForm.controls;
  }

  // ma fonction pour le retrait
  async onSubmit() {
    this.submitted = true;
    const formValue = this.myForm.value ;
    // console.log(formValue);
    const myRetrait = {
      codeTransaction: formValue.code,
      clientRetrait: formValue.telephone
    };
    // console.log(myRetrait);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `EMETTEUR <br> <strong>${this.nomComplet2}</strong> <br>
                TELEPHONE <br> <strong>${this.phone2}</strong> <br>
                N°CNI <br> <strong>${this.cni}</strong> <br>
                MONTANT <br> <strong>${this.montantRetrait}</strong>fcfa <br>
                RECEPTEUR <br> <strong>${this.nomComplet1}</strong> <br>
                TELEPHONE <br> <strong>${this.phone1}</strong> `,
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
            this.transaction.transactionRetrait(myRetrait).subscribe(async reponse => {
              this.donne = reponse.data;
              console.log(this.donne);
              const conf = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'reception réussi',
                subHeader: 'Vous avez retiré: ' + this.donne.montantRetrait +
                  ' de ' + this.nomComplet2 + ' le ' + this.donne.dateRetrait,
                message: `<strong>SAS_MONEY vous remercie!!!</strong> `,
                buttons: ['OK']
              });

              await conf.present();
              {
                this.myForm.reset();
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
