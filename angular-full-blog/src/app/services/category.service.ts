import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private fS:AngularFirestore) { };

   onload(){
    return this.fS.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
   }

}
