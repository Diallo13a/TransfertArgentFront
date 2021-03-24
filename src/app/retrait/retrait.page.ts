import { Component, OnInit } from '@angular/core';
import {Transaction} from '../depot/transaction.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {RetraitService} from './retrait.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  seg: string;
  // transaction: Transaction = new Transaction();
  code: any;
  formCode: FormGroup;
  // formCode = new FormGroup({
  //   code: new FormControl(['', [Validators.required, Validators.maxLength(20)]]),
  // });
  //  activeBenefice = false;
  //  activeEmetteur = true;
   emetteur: any;
   beneficiaire: any;
   dataEnv: any;
   dataRec: any;
   errorCode: any;


  constructor(
              public formBuilder: FormBuilder,
              public retraitService: RetraitService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router
  ) {
    this.formCode = this.formBuilder.group({
      code: ['153576', [Validators.required]]
    });
  }
  // segmentChanged(ev: any) {
  //   if (ev.detail.value === 'dataEnv'){
  //     this.activeBenefice = true;
  //     this.activeEmetteur = false;
  //   } else {
  //     this.activeBenefice = false;
  //     this.activeEmetteur = true;
  //   }
  // }

  ngOnInit() {
    this.seg = 'beneficiaire';
    if (this.formCode.value.code === '') {
      return   'Veuillez entrer le code de transaction!';
    }
  }

  afficheInfo() {
    // console.log(this.formCode.value.code);
    this.retraitService.get(this.formCode.value.code)
      .subscribe((data: any) => {
        // console.log(data);
        this.dataEnv = data[1] ;
        this.dataRec = data[2];
        console.log(this.dataEnv);
        console.log(this.dataRec);
      }
      , (err: any) => {
        console.log(err);
      });
  }

  cancelRetrait() {
    this.formCode.reset();
    this.errorCode = '';
    this.router.navigate(['/admin']);
  }

  async successRetrait(successMessage: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Opération reussie!',
      message: `<span style="text-align: center"><strong>BENEFICIAIRE</strong></span><br>
                CNI: <strong>${this.dataRec.cni}</strong><br>
                NOM & PRENOM: <strong>${this.dataRec.nomComplet}</strong><br>
                CODE TRANSACTION: <strong>${this.dataRec.codeTransaction}</strong><br>
                <span style="text-align: center"><strong>EMETTEUR</strong></span><br>
                CNI: <strong>${this.dataEnv.cni}</strong><br>
                NOM & PRENOM: <strong>${this.dataEnv.nomComplet}</strong><br>
                `,
      buttons: ['OK']
    });
    await alert.present();
  }
  async confirmRetrait() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-loading',
      message: 'chargement...'
    });

    await loading.present();
    console.log(this.formCode.value.code);
    this.retraitService.retirer(this.formCode.value.code).subscribe(data => {
      this.successRetrait(data);
      this.formCode.reset();
      this.router.navigate(['/admin']);
      loading.dismiss();
    }
    , async erreur => {
        this.errorCode = erreur.error;
        await loading.dismiss();
        // const alert = await this.loadingCtrl.create({
        //   cssClass: 'my-loading',
        //   message: erreur.error,
        //   buttons: ['Ok']
        // });
        // await alert.present();
    }
    );
  }
}
