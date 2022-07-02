import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import * as moment from "moment";

@Component({
  selector: 'app-timedate-picker',
  templateUrl: './timedate-picker.page.html',
  styleUrls: ['./timedate-picker.page.scss'],
})
export class TimedatePickerPage implements OnInit {


  date;
  time_now

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.time_now = new Date(Date.now());
    console.log(this.time_now)
  }

  save(number){
    var dt = moment(number).format('DD-MM-YYYY');
  //   var elegida = moment(number);
  //   var hoy = moment(this.time_now,'DD-MM-YYYY'); 
  //   console.log(elegida," - ", hoy)
  //   var before = elegida.isBefore(hoy);
  //   console.log("es antes? ", before)
  // if (before) {
  //   alert("No puedes elegir una fecha que esta en el pasado")
  // }else{
  //   this.modalCtrl.dismiss(
  //     dt
  //   )  
  // }
  var date = moment(number)
  var now = moment();
console.log(date,now)
if (now > date) {
   console.log("in past")
   alert("No puedes elegir una fecha que esta en el pasado")
} else {
  console.log("in future")
  this.modalCtrl.dismiss(
        dt
      )  
}
  
    
    }

}