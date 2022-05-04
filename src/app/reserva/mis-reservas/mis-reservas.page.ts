import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.page.html',
  styleUrls: ['./mis-reservas.page.scss'],
})
export class MisReservasPage implements OnInit {


  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
   @Input() uid
  @Input() proyecto
  @Input() servicio
 
 
  reservas  = []
  ngOnInit() {
    console.log("aja: ", this.uid,this.servicio,this.proyecto)
    this.get_comunicados();
  }

  get_comunicados(){
    this.fbs.consultar("/user/"+this.uid+"/proyectos/"+this.proyecto+"/servicios/"+this.servicio+"/reservas").subscribe((servicios) => {
      this.reservas = [];
      servicios.forEach((datosTarea: any) => {
        var starttimestamp = datosTarea.payload.doc.data().startDate

        var endtimestamp = datosTarea.payload.doc.data().startTime

        //console.log(startDate.getTime())
        console.log("hora inicial: " , starttimestamp)
        //console.log(endDate.getTime())
        console.log("hora final: ", endtimestamp)
        this.reservas.push({
          id: datosTarea.payload.doc.id,
          dia: starttimestamp,
          hora: endtimestamp,
         // data: datosTarea.payload.doc.data()
        });
        //   var timestamp = 1607110465663
        //   var date = new Date(timestamp);
        
        // this.comunicados[0].data.endTime
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de comunicados")
      console.log(this.reservas)
    });
}

delete(reserva){
  const res = confirm("Estas seguro que quieres eliminar esta reserva?");
  if(res){
    this.fbs.delete_doc("/user/"+this.uid+"/proyectos/"+this.proyecto+"/servicios/"+this.servicio+"/reservas", reserva).then(() => {
      })

      this.fbs.delete_doc("/Proyectos/"+this.proyecto+"/Servicios/"+this.servicio+"/reservas",reserva).then(() => {
        // Actualizar la lista completa
      // this.consultar_lista_servicios();
        // Limpiar datos de pantalla
        //this.tareaEditando = {} as Tarea;
      })
  }
  console.log("este es el id a borrar: " , reserva)
}

  async presentAlertdone() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!',
      subHeader: 'Formulario enviado con exito',
      message: 'Gracias por tus sugerencias.',
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
