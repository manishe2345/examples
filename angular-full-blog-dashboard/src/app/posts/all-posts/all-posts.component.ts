import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';


interface CategoryIt {
  id: any,
  data: any
  }

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  constructor(private pS:PostService){}

  categoryray:Array<CategoryIt>=[]

ngOnInit(): void {
  this.pS.loadData().subscribe(thing => {
    this.categoryray=thing;
  })
}
  

onEdit(){};

onDelete(id:any,imgsrc:any){
  this.pS.delete(imgsrc,id)
};

featured(id:any,value:boolean){
  const featuredData={
    isfeatured:value,
  }
  this.pS.markFeatured(id,featuredData)
};

reFeatured(id:any,value:boolean){
  const ndata={
    isfeatured:value,
  }
  this.pS.removeFeatured(id,ndata)
};


}
