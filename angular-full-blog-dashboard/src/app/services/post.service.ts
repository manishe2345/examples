import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable, from, map } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private astg: AngularFireStorage, private tS: ToastrService, private asf: AngularFirestore) { }

  //this is to uploimage and post data

  uplad(selectedImg: any, postdata: any) {
    let filepath = `postIMG/${Date.now()}`;
    const uploadTask = this.astg.upload(filepath, selectedImg);

    uploadTask.then(snapshot => {
      this.astg.ref(filepath).getDownloadURL().subscribe(URL => {
        postdata.postimgpath = URL;

        this.asf.collection('posts').add(postdata).then(docref => {
          this.tS.success('saved data successfully');
        });
      });
    });


  };

  //this is to load data on on posts component

  loadData() {

    return this.asf.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  //this is to get the values of data that is to be edited ,into the form

  editData(id: string) {
    return this.asf.collection('posts').doc(id).valueChanges()
  };


  //this is to upload the new edited data

  uaplad(selectedImg: any, postdata: any, imgSrc: any, id: any) {
    const uploadTask = this.astg.refFromURL(imgSrc).put(selectedImg)

    this.asf.collection('posts').doc(id).update(postdata).then(docref => {
      this.tS.success('edited successfully')
    })
  };

   //deleting the data

  delete(imgSrc:any, id:any){
    this.astg.refFromURL(imgSrc).delete();

    this.asf.collection('posts').doc(id).delete().then(docref => {
      this.tS.success('deleted successfully')
    })

  };


  markFeatured(id:any,featuredData:any){
    this.asf.collection('posts').doc(id).update(featuredData).then(docref =>{
      this.tS.success('this post is being featured now...')
    })
  }
  removeFeatured(id:any,ndata:any){
    this.asf.collection('posts').doc(id).update(ndata).then(docref =>{
      this.tS.warning('this post will not be featured now...')
    })
  }

}
