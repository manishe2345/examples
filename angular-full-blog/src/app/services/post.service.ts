import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/compat/app';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs:AngularFirestore, private astg:AngularFireStorage) { };

  loaddata(){
    return this.afs.collection('posts',ref =>ref.where('isfeatured','==',true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  };




  loadLatest(){
    return this.afs.collection('posts',ref =>ref.orderBy('createdat')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  };




  loadCategory(data:string){
    return this.afs.collection('posts',ref =>ref.where('category.categoryid','==',data)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  };




  loadPost(data:string){
    return this.afs.collection('posts').doc(data).valueChanges()

  }

  loadSimilar(catid:string){
    return this.afs.collection('posts',ref =>ref.where('category.categoryid','==',catid).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  };


  countViews(postid:string){
    const viewsCount={
      views:firebase.default.firestore.FieldValue.increment(1)
    };
    this.afs.collection('posts').doc(postid).update(viewsCount)
  }


}
