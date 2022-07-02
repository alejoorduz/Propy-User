import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable } from "rxjs";
import { AuthService } from '../auth.service';
import { User } from "../user";
import { Router, NavigationExtras } from "@angular/router";


@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.page.html',
  styleUrls: ['./verificacion.page.scss'],
})
export class VerificacionPage implements OnInit {

  user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit() {
  }

async sendemail(): Promise<void>{
  try {
    await this.authSvc.sendVerificationEmail();
  } catch (error) {
    console.log(error)
  }
}

ngOnDestroy(): void{
  this.authSvc.logout();
}

dismiss(){
  console.log("cerrando modal de perfil")
  //this.modalCtrl.dismiss();
  this.router.navigate(['iniciosesion']);
}


}