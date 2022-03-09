import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import * as $ from "jquery";
import { data } from 'jquery';
import { ModalController } from "@ionic/angular";
import { FirestoreService } from '../../firestore.service';
import * as moment from 'moment';
import { format, parseISO } from 'date-fns';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';

import { MonthViewComponent} from 'ionic2-calendar/monthview'
import { WeekViewComponent} from 'ionic2-calendar/weekview'
import { DayViewComponent} from 'ionic2-calendar/dayview'
import { Router } from '@angular/router';

//ionic 6.16.1, angular 13.0.4, Node 16.13.1 , npm 8.3.0, rxjs 6.6.7

@Component({
  selector: 'app-adding-modal',
  templateUrl: './adding-modal.page.html',
  styleUrls: ['./adding-modal.page.scss'],
})
export class AddingModalPage implements OnInit{  
  modalReady = false;
  eventSource = [];

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  selectedDate = new Date();
  //-----------------datos del formulario--------------------------
  //servicio del edificio
  servicio: string  //= "Piscina"
  //variables del picker de dias de la semana en los que el servicio esta habilitado
  
  @Input() hora_inicial;
  @Input() hora_final
  @Input() hora_reserva
  @Input() dias_reserva
  @Input() lunes
  @Input() martes
  @Input() miercoles
  @Input() jueves
  @Input() viernes
  @Input() sabado
  @Input() domingo

  hoy;

//,public alertController: AlertController,public formModule: FormsModule
  constructor(public router: Router, public navCtrl: NavController,private storage: Storage,private modalCtrl: ModalController,private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
    console.log(this.dias_reserva,this.hora_inicial,this.hora_final,this.hora_reserva,this.lunes,this.martes,this.miercoles,this.jueves,this.viernes,this.sabado,this.domingo)
    //this.create_reservations_array()
  }
  


  addNewEvent() {
    let start = this.selectedDate;
    let end = this.selectedDate;
    end.setMinutes(end.getMinutes() + 60);

    let event = {
      title: 'Event #' + start.getMinutes(),
      startTime: start,
      endTime: end,
      allDay: false,
    };

   // this.db.collection(`events`).add(event);
  }

  onViewTitleChanged(title) {
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  navigate(){
    console.log("navegando al calendario")
    this.modalCtrl.dismiss();
    this.router.navigate(['/calendar']);
  }


  async ionViewWillEnter() {
    //await this.storage.create();
  }

  
  conarg(){
    this.modalCtrl.dismiss({
    /*  id: this.id,
      uuid: this.uuid,
      marca: this.marca,
      color: this.color,
      viajes: this.viajes,
      tiempo: this.tiempo,
      producido: this.tiempo*/
    })
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
