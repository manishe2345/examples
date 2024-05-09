import { Injectable } from '@angular/core';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Catgor } from '../models/catgor';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private asf: AngularFirestore, private toastr: ToastrService) { }
  saveData(data: any) {
    this.asf.collection('categories').add(data).then(docRef => {
      console.log(docRef);
      this.toastr.success("success")
    })
      .catch(error => { console.log(error) })
  }
  loadData() {

    return this.asf.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Catgor;
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  updateData(id: any, EditData: any) {
    this.asf.collection('categories').doc(id).update(EditData).then(DocRef => {
      console.log(DocRef);
      this.toastr.success('edited successfully ...')
    })
  }
  deleteData(id: any) {
    this.asf.collection('categories').doc(id).delete().then(DocRef => {
      this.toastr.error("deleted category successfully ... ")
    })
  }
}

