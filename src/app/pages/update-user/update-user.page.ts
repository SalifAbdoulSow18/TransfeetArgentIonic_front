import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {ListSiegeService} from '../../services/list-siege.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  cni = '';
  nom = '';
  telephone = '';
  prenom = '';
  username = '';
  address = '';
  idUser: any;
  myData: any;
  myForm: any = FormGroup ;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              public alertController: AlertController,
              private userService: ListSiegeService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.idUser = localStorage.getItem('id');
    this.userService.oneUsers(this.idUser).subscribe(
      data => {
        console.log(data);
        this.myData = data;
        this.nom = this.myData.nom ;
        this.prenom = this.myData.prenom;
        this.username = this.myData.username ;
        this.cni = this.myData.cni;
        this.telephone = this.myData.phone ;
        this.address = this.myData.address;
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      cni: ['', [ Validators.required]],
      nom: ['', [ Validators.required]],
      prenom: ['', [ Validators.required]],
      username: ['', [ Validators.required]],
      telephone: ['', [ Validators.required]],
      address: ['', [ Validators.required]]
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
    const myUser = {
      cni: formValue.cni,
      nom: formValue.nom,
      prenom: formValue.prenom,
      username: formValue.username,
      address: formValue.address,
      phone: formValue.telephone,
      statut: this.myData.statut,
    };
    console.log(myUser);
    this.userService.editUser(myUser, this.idUser).subscribe( async reponse => {
      const conf = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'reception réussi',
        subHeader: 'Vous modification a été enregistrée avec succès ',
        message: `COOL`,
        buttons: ['OK']
      });

      await conf.present();
      {
        this.myForm.reset();
      }
      console.log('good');
    }, error => {
      console.log(error);
    });

  }

}
