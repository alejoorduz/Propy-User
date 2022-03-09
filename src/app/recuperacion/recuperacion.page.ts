import { Component, OnInit } from '@angular/core';
import {  NgZone } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FirestoreService } from '../firestore.service';
import { IonicModule } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  constructor(
    public route: ActivatedRoute, 
    public router: Router, 
    public authSvc: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService,
    private ngZone: NgZone) {}


    ngOnInit() {
    }
    
async onReset(email){
  try {
    await this.authSvc.resetPassword(email.value)
    this.router.navigate(['/iniciosesion'])
  } catch (error) {
    console.log(error)
  }
}


back(){
    this.router.navigate(['admin']);
  }
}