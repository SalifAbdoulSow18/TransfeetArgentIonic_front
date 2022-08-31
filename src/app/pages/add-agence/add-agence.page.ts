import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {ListSiegeService} from '../../services/list-siege.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-agence',
  templateUrl: './add-agence.page.html',
  styleUrls: ['./add-agence.page.scss'],
})
export class AddAgencePage implements OnInit {
  hide = false;
  cni = '';
  nom = '';
  password = '';
  telephone = '';
  prenom = '';
  username = '';
  profil = '';
  address = '';
  montant = '';
  nomAgence = '';
  latittude = '';
  longitude = '';
  total: any;
  frais: any;
  myProfil: any;
  idProfil: any;
  myForm: any = FormGroup ;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              public alertController: AlertController,
              private userService: ListSiegeService,
              private router: Router
  ) {
    this.userService.myProfils().subscribe(data => {
      this.myProfil = data ;
    }) ;
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      montant: ['', [ Validators.required]],
      nomAgence: ['', [ Validators.required]],
      latittude: ['', [ Validators.required]],
      longitude: ['', [ Validators.required]],
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

  optionChoised(id: any) {
    this.idProfil = id;
    // console.log(this.idProfil);
  }
  // caché les deplacement
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
    const monUsers = [{
      cni: formValue.cni,
      nom: formValue.nom,
      prenom: formValue.prenom,
      username: formValue.username,
      address: formValue.address,
      phone: formValue.telephone,
      password: formValue.password,
      profil: 'api/profils/' + this.idProfil,
    }];
    const monAgence = {
      nomAgence: formValue.nomAgence,
      latittude: formValue.latittude,
      longitude: formValue.longitude,
      users: monUsers,
    };
    const myCompte = {
      montant: formValue.montant,
      agence: monAgence
    };
    console.log(myCompte);
    this.userService.addCompte(myCompte).subscribe(async reponse => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      });
      this.myForm.reset();
      setTimeout(() => {this.router.navigate(['/list-agence']); }, 1500);
      console.log('good');
    }, error => {
      console.log(error);
    });

  }
}
