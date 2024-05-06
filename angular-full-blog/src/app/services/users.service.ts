import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private asf:AngularFirestore) { }

  subscribeUsers(formdata:any){
    this.asf.collection('subscribers').add(formdata).then(()=>{
      console.log('success')
    })
  }

  submitComment(commentdata:any){
    this.asf.collection('comments').add(commentdata)
  }

  getcomments(id:any){
    return this.asf.collection('comments',ref => ref.where('postid','==',id)).snapshotChanges().pipe(
      map(action=>{
        return action.map(a=>{
          const data=a.payload.doc.data() as Comment;
          const id=a.payload.doc.id;
          return{data,id}
        })
      }
        )
    )
  }

}
