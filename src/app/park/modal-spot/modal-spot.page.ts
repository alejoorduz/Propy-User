import { Component, OnInit, Input } from '@angular/core';
import { ToastController,AlertController,ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-spot',
  templateUrl: './modal-spot.page.html',
  styleUrls: ['./modal-spot.page.scss'],
})
export class ModalSpotPage implements OnInit {

  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() torre
  @Input() apto
  @Input() fecha
  @Input() propietario
  @Input() prop_torre
  @Input() prop_apto
  @Input() spot
  @Input() hora_inicial
  @Input() hora_final
  

  constructor(private modalCtrl: ModalController ) { }

  ngOnInit() {
    console.log(this.uid,this.proyecto,this.torre,this.apto,this.fecha,this.propietario,this.prop_torre,this.prop_apto,this.spot,this.hora_inicial,this.hora_final)
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
