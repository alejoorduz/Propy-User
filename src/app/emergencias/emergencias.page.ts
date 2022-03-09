import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-emergencias',
  templateUrl: './emergencias.page.html',
  styleUrls: ['./emergencias.page.scss'],
})
export class EmergenciasPage implements OnInit {

  constructor(private modalCtrl: ModalController ,private callNumber: CallNumber) { }

  ngOnInit() {}

  llamar(number){
    console.log("Entre a la llamada de emergencia")
    this.callNumber.callNumber(number, true)
   .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }

    dismiss(){
      this.modalCtrl.dismiss();
    }
}