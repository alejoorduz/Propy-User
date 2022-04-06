import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
//import OneSignal from 'onesignal-cordova-plugin';
import { AlertController, Platform} from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
    private oneSignal: OneSignal
) {
  console.log("Lest go!")
  this.initializeApp();
  }

   // Add to index.js or the first page that loads with your app.
// document.addEventListener('deviceready', OneSignalInit, false);
// function OneSignalInit() {
//   console.log("app ready and started")
//     // Uncomment to set OneSignal device logging to VERBOSE  
//     // window.plugins.OneSignal.setLogLevel(6, 0);
    
//     // NOTE: Update the setAppId value below with your OneSignal AppId.
//     this.OneSignal.setAppId("b1df2348-4560-4c80-9841-6fc2ab6ad814");
//     this.OneSignal.setNotificationOpenedHandler(function(jsonData) {
//         console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//     });
    
//     // iOS - Prompts the user for notification permissions.
//     //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
//     this.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
//         console.log("User accepted notifications: " + accepted);
//     });
// }

 
initializeApp() {
 this.platform.ready().then (() => {
   console.log("platform ready")
    if (this.platform.is('cordova')) {
      console.log("this is cordova")
      this.setupPush();
    }
  })
};

setupPush () {
  console.log("configuring push notifications")
  /*Onesignal id and firebase id*/
      this.oneSignal.startInit('b1df2348-4560-4c80-9841-6fc2ab6ad814','11538880600');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe((message) => {
          // do something when notification is received
        this.showAlert("Cordova", "mensaje", "prueba que sirve")
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
      });

//       this.oneSignal.endInit();
  // this.oneSignal.startInit('b1df2348-4560-4c80-9841-6fc2ab6ad814', '11538880600');
  // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
  // this.oneSignal.handleNotificationOpened().subscribe(data => {
  //  });
  // this.oneSignal.handleNotificationReceived().subscribe(data => {
  //   
  // });
   this.oneSignal.endInit();
   }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: {task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    });
    alert.present();
  }
}
