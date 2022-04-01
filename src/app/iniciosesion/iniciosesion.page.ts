import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterLink } from '@angular/router';
import { Router, NavigationExtras } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {

  contra_escrita: String;
  
  user: any = {};

  constructor(private alertCtrl: AlertController,public router: Router,private authSvc: AuthService) { }

  ngOnInit() {
  }

async onlogin(email,password){
      console.log("iniciando sesion o error")
    try {
      const user = await this.authSvc.login(email.value,password.value);
      if (user){
        console.log("y aca?")
        const isverified = this.authSvc.isEmailVerified(user);
        console.log("entre sisass perro" + user)
        this.redirectUser(isverified)
      }
    } catch (error) {
      //console.log("el error es: " + error);
      console.log("errorsito")
      console.log(error)
      this.presentAlert(error)
    }
}

async presentAlert(error) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Errorsito',
    subHeader: 'Verifica el error',
    message: error,
    buttons: ['OK']
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  //console.log('onDidDismiss resolved with role', role);
}


redirectUser(isverified:boolean = true){
  if(isverified){
    this.router.navigate(['inscripciones']);
  }else{
    //console.log("verificar email")
  }
}

crear_cuenta(){
  //console.log("Crear Cuenta")
  this.router.navigate(['register']);
  //this.router.navigate(['register']);
}

recuperacion(){
  this.router.navigate(['recuperacion']);
}

  }
