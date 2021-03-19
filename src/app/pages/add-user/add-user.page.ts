import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  cni = '';
  nom = '';
  password = '';
  telephone = '';
  prenom = '';
  username = '';
  profil = '';
  address = '';
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
      nom: ['', [ Validators.required]],
      prenom: ['', [ Validators.required]],
      username: ['', [ Validators.required]],
      telephone: ['', [ Validators.required]],
      address: ['', [ Validators.required]],
      password: ['', [ Validators.required, Validators.minLength(6)]],
      profil: ['', [ Validators.required]],
    });
  }

  get f(): any {
    return this.myForm.controls;
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
              // console.log(this.donne);
              const conf = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Transfert réussi',
                subHeader: 'Vous avez envoyé: ' + this.donne.montant +
                  ' à ' + formValue.nomComplet2 + ' le ' + this.donne.dateDepot,
                message: `CODE DE TRANSACTION  <br> <strong>${this.donne.codeTransaction}</strong> `,
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
