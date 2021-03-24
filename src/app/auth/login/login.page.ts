import { Component } from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }
  const; // @ts-ignore
  decode: any;

  form = new FormGroup({
    username: new FormControl('khadi', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('pass_1234', [Validators.required, Validators.minLength(8)])
  });

  showPassword = false;
  passwordToggleIcon = 'eye';
// tristan75 kpineau
  async onSubmit() {
   // console.log(this.form.value.username);
   const loading = await this.loadingCtrl.create({message: 'loading in ...'});
   await loading.present();
   this.authService.login(this.form.value.username, this.form.value.password)
     .subscribe(
       // async token => {
       async (data: any) => {
         localStorage.setItem('token', JSON.stringify(data));
         this.decode = jwt_decode(data.token);
         // console.log(this.decode.roles[0]);
         localStorage.setItem('id', this.decode.id);
         // console.log(this.decode.id);
         console.log(this.decode.agence);
         await loading.dismiss();
         this.router.navigateByUrl('/admin');
       },
       async () => {
         const alert = await this.alertCtrl.create({message: 'Username ou password incorrect !', buttons: ['Ok']});
         await alert.present();
         await loading.dismiss();
       }
     )
   ;
  }

  tooglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }
}
