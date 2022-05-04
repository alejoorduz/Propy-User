import * as $ from "jquery";
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { ToastController, AlertController } from '@ionic/angular';
import { MonthViewComponent} from 'ionic2-calendar/monthview'
import { WeekViewComponent} from 'ionic2-calendar/weekview'
import { DayViewComponent} from 'ionic2-calendar/dayview'
import { Step } from 'ionic2-calendar/calendar';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as moment from "moment";
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { LocalNotifications} from '@ionic-native/local-notifications/ngx'
import { ELocalNotificationTriggerUnit } from '@awesome-cordova-plugins/local-notifications';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
//@ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;
  proyecto:string;
  servicio: string;
  hora_inicial:number;
  hora_final:number;
  max_reserva:number;
  horas_restringidas = [];
 // hora_restringida: number;
  periodo:number;
  lunes:number;
  martes:number;
  miercoles:number;
  jueves:number;
  viernes:number;
  sabado:number;
  domingo:number;

  boton_atras: boolean;
  boton_dia: boolean;
  boton_reserva;

  reservas_full: boolean;

  hora_bloqueada:boolean;
  dia_seleccionado: string;
  mes_seleccionado: string;
  numero_mes;
  hora_seleccionada: string;
  has_events: boolean;
  day;
  mes;
  mostrar_add_event: boolean;

  lista_eventos = [];
  lista_reservas = [];

  eventSource = [];
  viewTitle: string;
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    step: 15 as Step,  
    locale: 'en-US'
   // locale: 'reserv'
  };

  current_user_uid;
  current_user_name;
  current_user_apto;

  user_info: any = {
    id: "",
    data: {}
};
//|| date.getHours()< hora 
  markDisabled = (date: Date) => {
    var current = new Date();
    var someDate = moment(current).format('D')
    var somemonth = moment(current).format('M')
    var someHour = moment(current).format('h')
     this.day = parseInt(someDate)
     this.mes = parseInt(somemonth)
    var hora = parseInt(someHour)
    console.log("horas restringidas: ",this.horas_restringidas[0],this.horas_restringidas[1],this.horas_restringidas[2],this.horas_restringidas[3],this.horas_restringidas[4],this.horas_restringidas[5])
    var ti = this.day + this.periodo; 
    if (this.periodo < 32 ) {
      console.log("el calendario es menor a 32")
      return  date.getDate()>ti  || date.getDay()==this.lunes || date.getDay()==this.martes
      || date.getDay()==this.miercoles || date.getDay()==this.jueves || date.getDay()==this.viernes || date.getDay()==this.sabado
      || date.getDay()==this.domingo || date.getMonth() > this.mes-1 || date.getMonth() < this.mes-1
      || date.getHours()==parseInt(this.horas_restringidas[0]) 
      || date.getHours()==parseInt(this.horas_restringidas[1]) 
      || date.getHours()==parseInt(this.horas_restringidas[2]) 
      || date.getHours()==parseInt(this.horas_restringidas[3]) 
      || date.getHours()==parseInt(this.horas_restringidas[4])
      || date.getHours()==parseInt(this.horas_restringidas[5]) 
      || date.getHours()==parseInt(this.horas_restringidas[6])
      || date.getHours()==parseInt(this.horas_restringidas[7]) 
      || date.getHours()==parseInt(this.horas_restringidas[8])
      || date.getHours()==parseInt(this.horas_restringidas[9]) 
      || date.getHours()==parseInt(this.horas_restringidas[10])
      || date.getHours()==parseInt(this.horas_restringidas[11]) 
      || date.getHours()==parseInt(this.horas_restringidas[12])
      || date.getHours()==parseInt(this.horas_restringidas[13]) 
      || date.getHours()==parseInt(this.horas_restringidas[14])
      || date.getHours()==parseInt(this.horas_restringidas[15]) 
      || date.getHours()==parseInt(this.horas_restringidas[16])
      || date.getHours()==parseInt(this.horas_restringidas[17]) 
      || date.getHours()==parseInt(this.horas_restringidas[18])
      || date.getHours()==parseInt(this.horas_restringidas[19]) 
      || date.getHours()==parseInt(this.horas_restringidas[20])
      || date.getHours()==parseInt(this.horas_restringidas[21])
      || date.getHours()==parseInt(this.horas_restringidas[22]) 
      || date.getHours()==parseInt(this.horas_restringidas[23])
      
    }
    //date.getDate() < day ||
    if(this.periodo === 62){
      console.log("el calendario es igual a 62",this.mes)
      return  date.getDay()==this.lunes || date.getDay()==this.martes
      || date.getDay()==this.miercoles || date.getDay()==this.jueves || date.getDay()==this.viernes || date.getDay()==this.sabado
      || date.getDay()==this.domingo || date.getMonth() > this.mes || date.getMonth() < this.mes-1
      || date.getHours()==parseInt(this.horas_restringidas[0]) 
      || date.getHours()==parseInt(this.horas_restringidas[1]) 
      || date.getHours()==parseInt(this.horas_restringidas[2]) 
      || date.getHours()==parseInt(this.horas_restringidas[3]) 
      || date.getHours()==parseInt(this.horas_restringidas[4])
      || date.getHours()==parseInt(this.horas_restringidas[5]) 
      || date.getHours()==parseInt(this.horas_restringidas[6])
      || date.getHours()==parseInt(this.horas_restringidas[7]) 
      || date.getHours()==parseInt(this.horas_restringidas[8])
      || date.getHours()==parseInt(this.horas_restringidas[9]) 
      || date.getHours()==parseInt(this.horas_restringidas[10])
      || date.getHours()==parseInt(this.horas_restringidas[11]) 
      || date.getHours()==parseInt(this.horas_restringidas[12])
      || date.getHours()==parseInt(this.horas_restringidas[13]) 
      || date.getHours()==parseInt(this.horas_restringidas[14])
      || date.getHours()==parseInt(this.horas_restringidas[15]) 
      || date.getHours()==parseInt(this.horas_restringidas[16])
      || date.getHours()==parseInt(this.horas_restringidas[17]) 
      || date.getHours()==parseInt(this.horas_restringidas[18])
      || date.getHours()==parseInt(this.horas_restringidas[19]) 
      || date.getHours()==parseInt(this.horas_restringidas[20])
      || date.getHours()==parseInt(this.horas_restringidas[21])
      || date.getHours()==parseInt(this.horas_restringidas[22]) 
      || date.getHours()==parseInt(this.horas_restringidas[23]);
    }
    if(this.periodo === 183){
      console.log("el calendario es igual a 183")
      return  date.getDay()==this.lunes || date.getDay()==this.martes
      || date.getDay()==this.miercoles || date.getDay()==this.jueves || date.getDay()==this.viernes || date.getDay()==this.sabado
      || date.getDay()==this.domingo || date.getMonth() > this.mes+4 || date.getMonth() < this.mes-1
      || date.getHours()==parseInt(this.horas_restringidas[0]) 
      || date.getHours()==parseInt(this.horas_restringidas[1]) 
      || date.getHours()==parseInt(this.horas_restringidas[2]) 
      || date.getHours()==parseInt(this.horas_restringidas[3]) 
      || date.getHours()==parseInt(this.horas_restringidas[4])
      || date.getHours()==parseInt(this.horas_restringidas[5]) 
      || date.getHours()==parseInt(this.horas_restringidas[6])
      || date.getHours()==parseInt(this.horas_restringidas[7]) 
      || date.getHours()==parseInt(this.horas_restringidas[8])
      || date.getHours()==parseInt(this.horas_restringidas[9]) 
      || date.getHours()==parseInt(this.horas_restringidas[10])
      || date.getHours()==parseInt(this.horas_restringidas[11]) 
      || date.getHours()==parseInt(this.horas_restringidas[12])
      || date.getHours()==parseInt(this.horas_restringidas[13]) 
      || date.getHours()==parseInt(this.horas_restringidas[14])
      || date.getHours()==parseInt(this.horas_restringidas[15]) 
      || date.getHours()==parseInt(this.horas_restringidas[16])
      || date.getHours()==parseInt(this.horas_restringidas[17]) 
      || date.getHours()==parseInt(this.horas_restringidas[18])
      || date.getHours()==parseInt(this.horas_restringidas[19]) 
      || date.getHours()==parseInt(this.horas_restringidas[20])
      || date.getHours()==parseInt(this.horas_restringidas[21])
      || date.getHours()==parseInt(this.horas_restringidas[22]) 
      || date.getHours()==parseInt(this.horas_restringidas[23]);
    }
   //var tie =  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);|| date.getMonth() > mes-1|| date.getDay()==4 
    //console.log("periodo",tie)

};

  selectedDate = new Date();

  constructor(private vibration: Vibration, private alertCtrl: AlertController,private localNotifications: LocalNotifications, private storage: Storage, private router: Router,private fbs: FirestoreService ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) {
    // console.log(this.router.getCurrentNavigation().extras.state.periodo);
    // console.log(this.router.getCurrentNavigation().extras.state.hora_inicial);
    // console.log(this.router.getCurrentNavigation().extras.state.hora_final);
    this.proyecto = this.router.getCurrentNavigation().extras.state.proyecto
    this.servicio = this.router.getCurrentNavigation().extras.state.servicio
    this.periodo = parseInt(this.router.getCurrentNavigation().extras.state.periodo) 
    this.hora_inicial = parseInt(this.router.getCurrentNavigation().extras.state.hora_inicial) 
    this.hora_final = parseInt(this.router.getCurrentNavigation().extras.state.hora_final) 
   // this.hora_restringida = parseInt(this.router.getCurrentNavigation().extras.state.hora_restringida) 
    this.horas_restringidas  = this.router.getCurrentNavigation().extras.state.hora_restringida
    this.max_reserva = parseInt(this.router.getCurrentNavigation().extras.state.max_reserva) 
    this.lunes = parseInt(this.router.getCurrentNavigation().extras.state.lunes) 
    this.martes = parseInt(this.router.getCurrentNavigation().extras.state.martes) 
    this.miercoles = parseInt(this.router.getCurrentNavigation().extras.state.miercoles) 
    this.jueves = parseInt(this.router.getCurrentNavigation().extras.state.jueves)
    this.viernes = parseInt(this.router.getCurrentNavigation().extras.state.viernes) 
    this.sabado = parseInt(this.router.getCurrentNavigation().extras.state.sabado) 
    this.domingo = parseInt(this.router.getCurrentNavigation().extras.state.domingo)  
    console.log("datos: ",this.hora_inicial,this.lunes,this.martes,this.miercoles,this.jueves, this.viernes, this.domingo,this.proyecto,this.servicio,this.horas_restringidas)
   }
//, this.lunes,this.martes,this.miercoles,this.jueves,this.viernes,this.sabado,this.domingo
   ionViewWillEnter() {
    this.getuseruid();
    this.consultar_lista_eventos();
    this.boton_atras = false;
    this.boton_dia = true;
    this.boton_reserva = false;
  }

  show_button(){
    console.log("ms",this.mes_seleccionado,this.mes)
    if (this.dia_seleccionado < this.day && this.numero_mes <= this.mes) {
      alert("No puedes elegir un dia anterior al dia de hoy")
    }else{
    this.calendar.mode = "day";
    this.boton_atras = true;
    this.boton_dia = false;
    this.boton_reserva = true;
    }
  }

  hide_button(){
    this.calendar.mode = "month";
    this.boton_atras = false;
    this.boton_dia = true;
    this.boton_reserva = false;
  }

  consultar_lista_eventos(){
   // console.log(this.current_user_uid, this.current_user_name,this.proyecto)
    this.fbs.consultar("Proyectos/"+this.proyecto+"/Servicios/"+this.servicio+"/reservas").subscribe((lista) => {
      this.eventSource = [];
      lista.forEach((ev: any) => {
        let event:any = ev.payload.doc.data();
        event.id = ev.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
        // this.lista_eventos.push({
        //   id: ev.payload.doc.id,
        //   data: ev.payload.doc.data()
        // });
      })
      //console.log("lista de eventos: ")
     // console.log(this.eventSource)
     
    });
  }

  async getuseruid(){
    let uid = await (await this.afAuth.currentUser).uid
    this.current_user_uid = uid
    this.getName(uid);
  }
  
  async getName(uid){
    this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
      }
      this.current_user_name = this.user_info.data.nombre;
      let email = this.user_info.data.email;
      this.current_user_apto = this.user_info.data.apto;
      //let edificio = this.user_info.data.proyecto
      //console.log("usuario: ",name,email,this.proyecto)
  });
  this.consultar_lista_reservas();
  }

  consultar_lista_reservas(){
   // console.log("usuario" , this.current_user_uid, this.servicio,this.proyecto)
    this.fbs.consultar("user/"+this.current_user_uid+"/proyectos/"+this.proyecto+"/servicios/"+this.servicio+"/reservas").subscribe((lista) => {
      this.lista_reservas = [];
      lista.forEach((datosTarea: any) => {
        this.lista_reservas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
     // console.log("estas son las reservas: " , this.lista_reservas , this.lista_reservas.length,this.max_reserva)
     if (this.lista_reservas.length === this.max_reserva ) {
     //  console.log("Ya tienes suficientes reservas para este servicio")
       this.reservas_full = true
     } else {
       var resta = this.max_reserva - this.lista_reservas.length
     //  console.log("te quedan reservas: " , resta)
       this.reservas_full = false
     }
    });
  }
  
  ngOnInit() {
  //   this.storage.create();
  //   this.storage.get('calendar').then(res=>{
  //     console.log(res)
  //     this.servicio = res.id
  //     this.hora_inicial = res.data.horainicial
  //     this.hora_final = res.data.horafinal
  //     this.hora_reserva = res.data.horareserva
  //     this.periodo = res.data.periodo
  //     this.lunes = res.data.lunes
  //     this.martes = res.data.martes
  //     this.miercoles = res.data.miercoles
  //     this.jueves = res.data.jueves
  //     this.viernes = res.data.viernes
  //     this.sabado = res.data.sabado
  //     this.domingo = res.data.domingo
  //     this.dias_reserva = res.data.diasreserva
  //   })
  //   this.storage.get('edificio').then(res=>{
  //     console.log(res)
  //     this.edificio = res
  //   })
  //   // $('#calendar').fullCalendar({
  //   //   startHour: "4",
  //   //   endHour: "18"
  //   // })
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

addNewEvent() {
  if (!this.current_user_apto) {
    this.presentAlertBlock("Usuario sin apartamento ","Ve a tu perfil y rellena tu apartamento para poder hacer reservas")
  } else {
  if (this.has_events) {
    //console.log("no puedes reservas a esta hora")
    this.presentAlertBlock("Esta hora ya tiene una reserva","Solo se admite 1 reserva por hora")
  } else {
    if(this.hora_bloqueada){
      //  console.log("no puedes reservas a esta hora")
        this.presentAlertBlock("Hora restringida por el Administrador","Elige otra que este disponible")
      }else{
        var current = new Date();
        var someHour = moment(current).format('HH')
        var someDay = moment(current).format("D")
        var hora = parseInt(someHour)
        var dia = parseInt(someDay)
            // this.eventSource = [];
         //   console.log(this.selectedDate)
            var selectedYear = this.selectedDate.getFullYear();
            var selectedMonth = this.selectedDate.getMonth();
            var selectedDay = this.selectedDate.getDate();
            var selectHour = this.selectedDate.getHours();
            console.log("hora actual: " , hora, " hora elegida: ",selectHour,"dia actual: " , dia, " dia elegida: ",selectedDay)
            if (selectHour <= hora && selectedDay === dia) {
              this.presentAlertBlock("Esta hora esta en el pasado","Debes elegir una hora despues de las " + someHour + ':00')
            } else {
               //console.log(selectedYear, selectedMonth , selectedDay, selectHour)
            var startTime = new Date(selectedYear, selectedMonth, selectedDay,selectHour)
            var endTime = new Date(selectedYear, selectedMonth, selectedDay, selectHour+1)
            console.log(startTime,endTime)
            let event = {
              title: this.current_user_apto,
              startTime: startTime,
              endTime: endTime,
              allDay: false,
            };
            this.presentAlert(event,selectedYear,selectedMonth,selectedDay,selectHour)
            //console.log(this.eventSource);
            // this.fbs.add("Proyectos/"+this.proyecto+"/Servicios/"+ this.servicio+"/reservas", event )
            }
           
      }
  }
}   
  }

  onTimeSelected(ev) {
      $(".formulario").css("background","green")
      $(".hora_seleccionadita").css("color","red")
      this.vibration.vibrate(100);
    setTimeout(() => {
      $(".formulario").css("background","rgb(201, 166, 224)")
      $(".hora_seleccionadita").css("color","black")
    }, 500);
    console.log("hora seleccionada:" , ev)
    //this.calendar.mode  = "day";
  //  console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
  //     (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
      this.hora_bloqueada = ev.disabled;
      var day_hour_string = ev.selectedTime;
      this.dia_seleccionado = day_hour_string.toString().slice(8,10);
      var mes_ingles = day_hour_string.toString().slice(4,7);
      if (mes_ingles === 'Jan') {
        this.mes_seleccionado = 'Enero'
        this.numero_mes = 1;
      }
      if (mes_ingles === 'Feb') {
        this.mes_seleccionado = 'Febrero'
        this.numero_mes = 2;
      }
      if (mes_ingles === 'Mar') {
        this.mes_seleccionado = 'Marzo'
        this.numero_mes = 3;
      }
      if (mes_ingles === 'Apr') {
        this.mes_seleccionado = 'Abril'
        this.numero_mes = 4;
      }
      if (mes_ingles === 'May') {
        this.mes_seleccionado = 'Mayo'
        this.numero_mes = 5;
      }
      if (mes_ingles === 'Jun') {
        this.mes_seleccionado = 'Junio'
        this.numero_mes = 6;
      }
      if (mes_ingles === 'Jul') {
        this.mes_seleccionado = 'Julio'
        this.numero_mes = 7;
      }
      if (mes_ingles === 'Aug') {
        this.mes_seleccionado = 'Agosto'
        this.numero_mes = 8;
      }
      if (mes_ingles === 'Sep') {
        this.mes_seleccionado = 'Septiembre'
        this.numero_mes = 9;
      }
      if (mes_ingles === 'Oct') {
        this.mes_seleccionado = 'Octubre'
        this.numero_mes = 10;
      }
      if (mes_ingles === 'Nov') {
        this.mes_seleccionado = 'Noviembre'
        this.numero_mes = 11;
      }
      if (mes_ingles === 'Dec') {
        this.mes_seleccionado = 'Diciembre'
        this.numero_mes = 12;
      }
      this.hora_seleccionada = day_hour_string.toString().slice(16,24);
      if ((ev.events !== undefined && ev.events.length !== 0)) {
        this.has_events = true
        this.boton_reserva = false;
      }else{
        this.has_events = false
       // this.boton_reserva = true;
      }
      if (ev.disabled) {
        this.mostrar_add_event = false;
        this.boton_reserva = false;
      } else {
        this.mostrar_add_event = true;
        this.boton_reserva = true;
      }
    //this.selectedDate = ev.selectedTime;
    this.selectedDate = new Date(ev.selectedTime);
  }

  onCurrentDateChanged(event: Date) {
  //  console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  dismiss(){
    this.router.navigate(["inscripciones"])
  }

  async presentAlertBlock(header,text) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      subHeader: header,
      message: text,
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  
  update_notification(selectedYear,selectedMonth,selectedDay,selectHour){
  //  console.log("sending notification in 10 seconds")
    var hora_notificacion = selectHour - 1; 
  //  console.log("hora: ", hora_notificacion, "real: " , selectHour) 
  //   this.localNotifications.schedule({
  //     title: '¡Tienes una reserva para hoy!',
  //     text: 'confirma tu reserva de las '+selectHour+':00',
  //     trigger: { in: 1, unit: ELocalNotificationTriggerUnit.MINUTE },
  //     //trigger: { every: ELocalNotificationTriggerUnit.HOUR}
  //     //trigger: { every: {hour: 9, minute:0}},
  //     led: 'FF0000',
  //     sound: null
  //  });

//   this.localNotifications.schedule({
//     title: 'Happy Birthday!!!',
//     trigger: { every: { month: 1, day: 4, hour: 18, minute: 5 } },
//     sound: 'file://sound.mp3',
//     led: 'FF0000',
//  });

   this.localNotifications.schedule({
    text: '¡Tienes una reserva de '+ this.servicio + ' en una hora!',
    trigger: { at: new Date(selectedYear, selectedMonth, selectedDay, hora_notificacion) },
    //trigger: {at: new Date(new Date().getTime() + 3600)},
    sound: 'file://sound.mp3',
    led: 'FF0000',
 });

  }


  async presentAlert(event,selectedYear,selectedMonth,selectedDay,selectHour) {
    let evento = {
      title: this.current_user_name,
      startDate: selectedDay + "/" + this.mes_seleccionado + '/' + selectedYear,
      startTime: selectHour,
      allDay: false,
    };
    var id = selectedDay + "-" + selectedMonth + '-' + selectedYear + '-' + selectHour
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Estas seguro?',
      subHeader: 'Confirma el dia de tu reserva',
      message: "Para el dia " +  this.dia_seleccionado + " de " +  this.mes_seleccionado  + " a las " + this.hora_seleccionada ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.fbs.insertar("Proyectos/"+this.proyecto+"/Servicios/"+ this.servicio+"/reservas", id, event)
            this.fbs.insertar("user/"+this.current_user_uid+"/proyectos/"+ this.proyecto+"/servicios/"+this.servicio+"/reservas", id, evento)
            this.update_notification(selectedYear,selectedMonth,selectedDay,selectHour);
            //this.router.navigate(["inscripciones"])
          }
        }
      ]
    });
    await alert.present();

  // const { role } = await alert.onDidDismiss();
  // console.log('onDidDismiss resolved with role', role);
}



}
