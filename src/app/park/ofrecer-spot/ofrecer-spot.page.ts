import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from "@ionic/angular";
import { PopoverController } from '@ionic/angular';
import { TimedatePickerPage } from '../../popups/timedate-picker/timedate-picker.page';
import { FirestoreService } from '../../firestore.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ofrecer-spot',
  templateUrl: './ofrecer-spot.page.html',
  styleUrls: ['./ofrecer-spot.page.scss'],
})
export class OfrecerSpotPage implements OnInit {

  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto
  @Input() torre

  fecha;
  spot;
  hora_inicial;
  hora_final;

  constructor(private modalCtrl: ModalController,private firestoreService: FirestoreService,public popoverController: PopoverController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  async timedate(){
    const modal = await this.modalCtrl.create({
      component: TimedatePickerPage,
      cssClass: 'timedate',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.torre
        //reserva: this.reserva
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      this.fecha = data['data'];
      console.log("esta es la data que devuelve el modal")
      console.log(this.fecha)
  });
    return await modal.present();
  }

  submitForm(){
    var h_ini = parseInt(this.hora_inicial);
    var h_fin = parseInt(this.hora_final);
      console.log(this.fecha,this.spot,h_fin,typeof(h_ini))
      if (typeof this.spot === 'undefined' || typeof this.fecha === 'undefined' || typeof this.hora_final === 'undefined' || typeof this.hora_inicial === 'undefined') {
        alert("Debes rellenar todos los espacios")
        console.log("rellena todo maldito")
      }else{
        if (this.spot === '' || this.fecha === '' || this.hora_final === '' || this.hora_inicial === '') {
          alert("Debes rellenar todos los espacios")
            console.log("rellena todo maldito desde el seugundo")
          }else {
            if(h_ini > h_fin){
              alert("La hora incial no puede ser mayor a la hora final")
            }else{
              // console.log("subiendo data")
            this.upload_reservation_data()
            }
          }
       }
}

  upload_reservation_data(){
    var timei = new Date(Date.now());
    // this.dia_guardado = timei;
    var ti = moment(timei).format('h:mm:ss a'); // var ti = moment(this.tiempoinicial).format('DD MM YYYY, h:mm:ss a');
    var dt = moment(timei).format('DD-MM-YYYY'); // var ti = moment(this.tiempoinicial).format('DD MM YYYY, h:mm:ss a');
   console.log("uploading data")
    var id = Math.floor(Math.random() * 3213546846468435454) + 1
    console.log("random",id)
    var sid = id.toString()
    //  console.log(ti,dt)
   var spot = {
    spot: this.spot,
    propietario: this.nombre,
    torre: this.torre,
    apto: this.apto,
    hora_inicial: this.hora_inicial,
    hora_final: this.hora_final,
    fecha: this.fecha
   }

    this.firestoreService.insertar("Proyectos/"+this.proyecto+"/parking/", this.fecha, {fecha:dt,hora:ti}  )
    this.firestoreService.insertar("Proyectos/"+this.proyecto+"/parking/"+this.fecha+"/spots/", sid, spot )
    this.firestoreService.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/spots/", sid, spot )

    //this.firestoreService.insertardos("Proyectos/"+this.proyecto+"/Servicios",this.servicio,"reservas", dt, {"7": this.hora_inicial} )
    //this.firestoreService.updatedos("Proyectos/"+this.proyecto+"/Servicios",this.servicio,"reservas", dt, {"7": this.hora_inicial}  )
    // .then(() => {
    //   console.log('Datos subidos correctamente!');
    //   //this.tareaEditando= {} as Tarea;
    // }, (error) => {
    //   console.error(error);
    // });
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 800);
  }

}
