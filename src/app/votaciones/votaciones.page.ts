import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {

  constructor(private fbs: FirestoreService,private callNumber: CallNumber,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto

  pregunta;
  numero;
 
  votaciones= [];
  
  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
   this.get_comunicados();
  }

  upload_publication(){
    if ($("#nombre_numero").val() == "" || $("#numero").val() == "") {
      this.presentAlert("Debes rellenar todos los espacios")
    } else {
       var timei = new Date(Date.now());
   // var ti = moment(timei).format('h:mm:ss a'); 
   // var dt = moment(timei).format('DD-MM-YYYY'); 
    let votacion = {
      pregunta: this.pregunta,
    };

    var id = Math.floor(Math.random() * 3213546846468435454) + 1
    console.log("random",id)
    var sid = id.toString()
    this.fbs.insertar("Proyectos/"+this.proyecto+"/votaciones/", sid, votacion )
    //this.fbs.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/mascotas/", sid, numero )
    $("#pregunta").val("");
    this.presentAlertdone();
    }
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
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

  get_comunicados(){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/votaciones").subscribe((servicios) => {
      this.votaciones = [];
      servicios.forEach((datosTarea: any) => {
        this.votaciones.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de votaciones")
      console.log(this.votaciones)
    });
}

  async presentAlertdone() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Listo!',
      subHeader: 'Registro exitoso',
      message: 'Pregunta guardada exitosamente',
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  llamar(number){
    console.log("Entre a la llamada de emergencia")
    this.callNumber.callNumber(number, true)
   .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  delete(comunicado){
    //console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
    this.fbs.delete_doc("Proyectos/"+this.proyecto+"/directorio", comunicado).then(() => {
    })
   }

   add_vote(res,id){
      console.log("el usuario voto: ",res,id)
      const resp = confirm("Seguro que quieres votar " + res + " ?")
      if (resp) {
        this.fbs.insertar("Proyectos/"+this.proyecto+"/votaciones/"+id+"/"+res, this.nombre , {"voto": res} )
        this.fbs.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/votaciones/", id , {"voto": true} )
      }
   }
}

