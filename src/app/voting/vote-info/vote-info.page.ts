import { Component, OnInit, Input, NgZone} from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import Chart from 'chart.js/auto';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.page.html',
  styleUrls: ['./vote-info.page.scss'],
})


export class VoteInfoPage implements OnInit {

  constructor(private fbs: FirestoreService,private ngZone: NgZone,private callNumber: CallNumber,private modalCtrl: ModalController ,public alertController: AlertController) { }
  
  @Input() id
  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto
  @Input() torre

  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  Chart: any;
 // id: any = 0;
  ChartBar: any;

  pregunta;
  votos_si;
  votos_no;
  statusMessage: string;
  votaciones = [];
  votaciones_res = [];
  voted;
  py;
  pn;
  voting: any = {
    id: "",
    data: {}
};

vote: any = {
  id: "",
  data: {}
};
  
  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
   this.get_votes();
   this.get_if_answered();
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

graph(){
  var pieData = {
    labels: ["SI", "NO"],
    datasets: [{
      //data: [60, 40],
      data: [this.py, this.pn],
      backgroundColor: [
           "#878BB6", 
           "#4ACAB4", 
          // "#FF8153"
        ]  
     }]
 };
const ctx = $('#myChart');
this.Chart = new Chart(ctx, {
  type: 'doughnut',
  data: pieData
});
}

get_votes(){
      this.fbs.consultarPorId("/Proyectos/"+this.proyecto+"/votaciones", this.id).subscribe((resultado) => {
        if (resultado.payload.data() != null) {
            this.voting.id = resultado.payload.id;
            this.voting.data = resultado.payload.data();
        }
        console.log(this.voting.data.si, this.voting.data.no)
        if(!this.voting.data.si){
          this.voting.data.si = 0;
        }
        if(!this.voting.data.no){
          this.voting.data.no = 0;
        }
        this.py = ((this.voting.data.si*100)/(this.voting.data.si+this.voting.data.no)).toFixed(0); 
        this.pn = ((this.voting.data.no*100)/(this.voting.data.si+this.voting.data.no)).toFixed(0);  
        console.log("votos:", this.voting.data.si,this.voting.data.no,this.py,this.pn); 
        this.pregunta = this.voting.data.pregunta;
        this.votos_no = this.voting.data.no;
        this.votos_si = this.voting.data.si;
        console.log(this.voting)
        
    });
}
  
  get_comunicados(){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/votaciones").subscribe((servicios) => {
      this.votaciones = [];
      servicios.forEach((datosTarea: any) => {
        var porcentajey = (datosTarea.payload.doc.data().si*100)/(datosTarea.payload.doc.data().si+datosTarea.payload.doc.data().no); 
        var porcentajex = (datosTarea.payload.doc.data().no*100)/(datosTarea.payload.doc.data().si+datosTarea.payload.doc.data().no);    
        this.votaciones.push(
          {
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data(),
          py: porcentajey.toFixed(1),
          pn: porcentajex.toFixed(1)
        });
       // $("#si").css("height","80%");
       // $("#no").css("height","20%");
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de votaciones")
      console.log(this.votaciones)
     this.get_if_answered()
    });
}

get_if_answered(){
  this.fbs.consultarPorId("user/"+this.uid+"/proyectos/"+this.proyecto+"/votaciones/", this.id).subscribe((resultado) => {
    if (resultado.payload.data() != null) {
        this.vote.id = resultado.payload.id;
        this.vote.data = resultado.payload.data();
    }
    this.voted = this.vote.data.voto
    console.log("voted:" ,this.voted)
    if (this.voted) {
      console.log("efectivamente ya se voto")
      this.graph();
    } else {
      console.log("No se ha efectuado el voto")
    }
    console.log("deEsta se voto? ", this.vote, this.voted)
    //this.graph();
});

//   this.fbs.consultar("user/"+this.uid+"/proyectos/"+this.proyecto+"/votaciones/").subscribe((servicios) => {
//    this.voted = [];
//     servicios.forEach((datosTarea: any) => {
//       this.voted.push({
//        // id: datosTarea.payload.doc.id,
//         voted: datosTarea.payload.doc.data()
//       });
//     })
//   console.log(this.votaciones.length) 
//   // for(var i = 0; i < this.votaciones.length ; i++){
//   //     this.votaciones[i].voted = this.voted[i].voted
//   // }
//  console.log("concatenada ")
//   console.log(this.votaciones)
//   });
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
    //this.Chart.destroy();
    this.modalCtrl.dismiss();
  }

  delete(comunicado){
    //console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
    this.fbs.delete_doc("Proyectos/"+this.proyecto+"/directorio", comunicado).then(() => {
    })
   }

   add_vote(res){
      console.log("el usuario voto: ",res,this.id)
      const resp = confirm("Seguro que quieres votar " + res + " ?")
      if (resp) {
        // this.Chart.destroy();
        this.fbs.insertar("Proyectos/"+this.proyecto+"/votaciones/"+this.id+"/"+res, this.nombre , {"voto": res} )
        this.fbs.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/votaciones/", this.id , {"voto": true} )
      }
      //this.get_votes();
      this.refresh_votes(res,this.id);
   }

   refresh_votes(res,id){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/votaciones/"+id+"/"+res).subscribe((servicios) => {
      this.votaciones_res = [];
      servicios.forEach((datosTarea: any) => {
        this.votaciones_res.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de votaciones de la respuesta", res)
      console.log(this.votaciones_res)
      console.log("esta seria entonces la cantidad de votos")
      console.log(this.votaciones_res.length)
      var votes = this.votaciones_res.length;
    console.log("queda con estos votos: ", votes)
    if (res === "si") {
      this.fbs.update("Proyectos/"+this.proyecto+"/votaciones/", id, {si: votes} )
    }
    if (res === "no") {
      this.fbs.update("Proyectos/"+this.proyecto+"/votaciones/", id, {no: votes} )
    }
    // setTimeout(() => {
     // this.modalCtrl.dismiss();
    // }, 300);
    });
   }
}


