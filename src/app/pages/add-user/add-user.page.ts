import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {TransactionsService} from '../../services/transactions.service';
import {Router} from '@angular/router';
import {ListSiegeService} from '../../services/list-siege.service';
import Swal from 'sweetalert2';

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
      // console.log(data);
      this.myProfil = data ;
    }) ;
  }

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

  optionChoised(id: any) {
    this.idProfil = id;
    // console.log(this.idProfil);
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
      password: formValue.password,
      profil: 'api/profils/' + this.idProfil,
    };
    console.log(myUser);
    this.userService.addUser(myUser).subscribe(async reponse => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      });
      this.myForm.reset();
      setTimeout(() => {this.router.navigate(['/list-user']); }, 1500);
      console.log('good');
    }, error => {
      console.log(error);
    });

  }

}
