import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from "@angular/router";
import { FirestoreService } from "../firestore.service";
import * as $ from "jquery";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private alertCtrl: AlertController,private fbs: FirestoreService ,private authsvc:AuthService, private router:Router) { }

  nombre_proyecto: string

  name;
  mail;
  cont;
  cont_rep;
  
  usuario_habilitado: boolean = true

  ngOnInit() {
    console.log(this.name,this.mail,this.cont,this.cont_rep)
  }

  async onRegister(email, password,nombre){
    console.log(this.name,this.mail,this.cont,this.cont_rep)
    // if ($("#nombre").val() == "" || $("#email").val() == "" || $("#contra").val() == "" || $("#contra_rep").val() == "") {
    if (typeof this.name === 'undefined' || typeof this.mail === 'undefined' || typeof this.cont === 'undefined' || typeof this.cont_rep === 'undefined') {
      this.presentAlert("Debes rellenar todos los espacios")
      console.log("rellena todo maldito")
    }else{
      if (this.name === '' || this.mail === '' || this.cont === '' || this.cont_rep === '') {
          this.presentAlert("Debes rellenar todos los espacios")
          console.log("rellena todo maldito desde el seugundo")
        }else {
          if (this.cont !=  this.cont_rep) {
            this.presentAlert("Las contraseñas deben coincidir")
            console.log("no son iguals las contras")
          } else {
            console.log("datos del registro-------------" + email.value + password.value + nombre.value)
            console.log(email.value, password.value)
          try {
            const user = await this.authsvc.register(email.value,password.value,nombre.value)
            if (user) {
            let uid = user.uid
            const isverified = this.authsvc.isEmailVerified(user);
            console.log("eemail verificado, este es el uid del usuario: " + uid)
            this.initialize_user(uid,nombre.value);
            this.router.navigate(['verificacion']);
            }
          } catch (error) {
            console.log(error)
          }
          }
        }
    }
  }

  async presentAlert(mensaje) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Verifica el error',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

initialize_user(uid,nombre_admin){
    console.log("usuario inicializado correctamente")
    this.fbs.update("user", uid , { rol: "usuario_tipo" });
    this.fbs.update("user" , uid , { nombre: nombre_admin });
    this.fbs.update("user" , uid , { habilitado: this.usuario_habilitado });
    //this.fbs.update(proyecto , "Administrador" , { rol: "Administrador" });
}

redirectUser(isverified:boolean){
  if(isverified){
    this.router.navigate(['inicio']);
  }else{
    console.log("verificar email")
  }
}

dismiss(){
  console.log("cerrando modal de perfil")
  //this.modalCtrl.dismiss();
  this.router.navigate(['iniciosesion']);
}

inicio(){
  this.router.navigate(['iniciosesion']);
}

}
