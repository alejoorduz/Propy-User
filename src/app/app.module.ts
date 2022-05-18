import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LocalNotifications} from '@ionic-native/local-notifications/ngx'

import { NgCalendarModule  } from 'ionic2-calendar';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { BLE } from "@ionic-native/ble/ngx";

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
//import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
//import { PdfViewerModule } from 'ng2-pdf-viewer';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
//import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
//import { File } from '@awesome-cordova-plugins/file';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
   // File,
   // FileOpener,
   // PdfViewerModule,
    AngularFireStorageModule,
    BrowserModule,
     NgCalendarModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(), 
      AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule],
  providers: [
    EmailComposer,
    OneSignal,
    File,
    FileOpener,
    FileTransfer,
   // DocumentViewer,
    BLE,CallNumber,
    Vibration,
    Geolocation,
    LocalNotifications,
    InAppBrowser,
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
