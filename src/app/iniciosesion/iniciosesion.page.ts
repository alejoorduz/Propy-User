import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterLink } from '@angular/router';
import { Router, NavigationExtras } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import * as $ from "jquery";

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {

  contra_escrita: String;
  
  user;
  password;

  constructor(private alertCtrl: AlertController,public router: Router,private authSvc: AuthService) { }

  ngOnInit() {
    this.user =localStorage.getItem("user")
    this.password = localStorage.getItem("password")
    console.log("credentials: ",this.user,this.password)
    $("#email").val(this.user);
    $("#password").val(this.password);
    if (this.user) {
      $("#basico").prop("checked",true)
    }
  }

  checkbasic(){
    console.log("Plan basico")
    console.log($("#basico").prop("checked"))
    if ($("#basico").prop("checked") === false) {
      var usr = $("#email").val();
      var pswrd = $("#password").val();
      console.log("cedentials in checkbox: ", usr, pswrd)
      localStorage.setItem("user",usr)
      localStorage.setItem("password",pswrd)
    }else{
      localStorage.clear();
    }
  }

async onlogin(email,password){
      //console.log("iniciando sesion o error")
    try {
      const user = await this.authSvc.login(email.value,password.value);
      if (user){
        console.log("y aca?")
        const isverified = this.authSvc.isEmailVerified(user);
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
    header: 'Ocurrio un problema',
    subHeader: 'No se pudo iniciar sesión por el siguiente problema',
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
    console.log("verificar email")
    this.presentAlert("Debes verificar tu cuenta desde el correo electronico (verifica en la bandeja de SPAM)")
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
