import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  public add(coleccion,doc){
    return this.angularFirestore.collection(coleccion).add(doc)
  }

  public insertar(coleccion,documentId,datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).set(datos);
  } 

  public insertardos(coleccion,documentId,col,doc,datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).collection(col).doc(doc).set(datos)
  } 


  public update(coleccion, documentId,datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).update(datos);
  }

  public updatedos(coleccion,documentId,col,doc,datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).collection(col).doc(doc).update(datos)
  }

  public consultar(coleccion) {
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }

  public consultardos(coleccion,doc) {
    return this.angularFirestore.collection(coleccion).doc(doc).snapshotChanges();
  }

  public consultartres(coleccion,doc,cols) {
    return this.angularFirestore.collection(coleccion).doc(doc).collection(cols).snapshotChanges();
  }

  public consultarPorId(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).snapshotChanges();
  }

  public consultarPorIds(coleccion, documentId,col) {
    return this.angularFirestore.collection(coleccion).doc(documentId).collection(col).snapshotChanges();
  }

  public get(coleccion,doc,col) {
    return this.angularFirestore.collection(coleccion).doc(doc).collection(col).get();
  }

  public delete_doc(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).delete();
  }
}
