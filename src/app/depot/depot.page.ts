import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DepotService} from './depot.service';
import {Transaction} from './transaction.model';


@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  seg: string;
  transaction: Transaction = new Transaction();
  // get cni(){
  //   return this.form.get('cni');
  // }
  // get nom(){
  //   return this.form.get('nom');
  // }
  // get prenom(){
  //   return this.form.get('prenom');
  // }
  // get phone(){
  //   return this.form.get('phone');
  // }
  // get montant(){
  //   return this.form.get('montant');
  // }
  // get frais(){
  //   return this.form.get('frais');
  // }
  // get total(){
  //   return this.form.get('total');
  // }
  // get prenomd(){
  //   return this.form.get('prenomd');
  // }
  // get nomd(){
  //   return this.form.get('nomd');
  // }
  // get phoned(){
  //   return this.form.get('phoned');
  // }
  // public errorMessages = {
  //   cni: [
  //     {type: 'required', message: 'La cni est requis'},
  //     {type: 'maxlength', message: 'CNI ne peut pas etre superieur à 20 caracteres'}
  //   ],
  //   nomComplet_envoyeur: [
  //     {type: 'required', message: 'Le nom est requis'},
  //     {type: 'maxlength', message: 'CNI ne peut pas etre superieur à 20 caracteres'}
  //   ],
  //   nomComplet_receveur: [
  //     {type: 'required', message: 'Le prenom est requis'},
  //     {type: 'maxlength', message: 'Prenom ne peut pas etre superieur à 20 caracteres'}
  //   ],
  //   phone: [
  //     {type: 'required', message: 'Le phone est requis'},
  //     {type: 'pattern', message: 'Svp entrer un numero phone valide'}
  //   ],
  //   montant: [
  //     {type: 'required', message: 'Montant est requis'},
  //     {type: 'pattern', message: 'Svp entrer un montant  valide'}
  //   ],
  //   frais: [
  //     {type: 'required', message: 'Le frais est requis'},
  //     {type: 'pattern', message: 'Svp entrer un frais  valide'}
  //   ],
  // total: [
  //   {type: 'required', message: 'Total est requis'},
  //   {type: 'pattern', message: 'Svp entrer un total valide'}
  // ],
  //   nomd: [
  //     {type: 'required', message: 'Le nom est requis'},
  //     {type: 'maxlength', message: 'CNI ne peut pas etre superieur à 20 caracteres'}
  //   ],
  //   prenomd: [
  //     {type: 'required', message: 'Le prenom est requis'},
  //     {type: 'maxlength', message: 'Prenom ne peut pas etre superieur à 20 caracteres'}
  //   ],
  //   phoned: [
  //     {type: 'required', message: 'Le phone est requis'},
  //     {type: 'pattern', message: 'Svp entrer un numero phone valide'}
  //   ]
  // };
  form = new FormGroup({

    cni_envoyeur: new FormControl(['', [Validators.required, Validators.maxLength(20)]]),

    nomComplet_envoyeur: new FormControl(),
    nomComplet_receveur: new FormControl(),
    // tslint:disable-next-line:max-line-length
    phone_client_envoyeur: new FormControl(['', [Validators.required, Validators.pattern('/[0-9]+/')]]),
    montant: new FormControl(['', [Validators.required, Validators.pattern('/[0-9]+/')]]),
    frais: new FormControl(['', [Validators.required, Validators.pattern('/[0-9]+/')]]),
    total: new FormControl(['', [Validators.required, Validators.pattern('/[0-9]+/')]]),
    // nomd: new FormControl(),
    // prenomd: new FormControl(),
    // tslint:disable-next-line:max-line-length
    phone_client_receveur: new FormControl(['', [Validators.required, Validators.pattern('/[0-9]+/')]]),
    cni_receveur: new FormControl()
  });

  // depot = {
  //   cni: '',
  //   nom: '',
  //   prenom: '',
  //   phone: '',
  //   montant: '',
  //   frais: '',
  //   total: '',
  //   nomd: '',
  //   prenomd: '',
  //   phoned: ''
  // };
  private activeBeneficier = false;
  private activeEmeteur = true;
  constructor(
    public depotService: DepotService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  // public submit(): any{
  //   console.log(this.emetteur.value);
  // }
  successMessage = 'Votre dépot à réussi avec succes';


  ngOnInit() {
    this.seg = 'emetteur';
  }

  suivant() {
    this.activeBeneficier = true;
    this.activeEmeteur = false;
  }

  async onSubmit() {
    console.log(this.form.value);
    const loading = await this.loadingCtrl.create({message: 'loading in ...'});
    // await loading.present();
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Opération reussie!',
      message: this.successMessage,
      buttons: ['OK']
    });
    await alert.present();
    this.depotService.saveDepot(this.form.value)
      .subscribe(
        async (data: any) => {
        console.log(data);
        this.router.navigate(['/admin']);
        await loading.dismiss();
      },
        async () => {
          const alert = await this.alertCtrl.create({message: 'Votre depot n\'a pas reussi', buttons: ['Ok']});
          await alert.present();
          await loading.dismiss();
        }
      );
  }
}
