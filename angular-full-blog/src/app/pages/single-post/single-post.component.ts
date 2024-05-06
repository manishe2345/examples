import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  constructor(private route:ActivatedRoute, private pS:PostService){}

  id!:string;
  pdata!:any;
  did!:string;
  similarData!:any;

  ngOnInit(): void {
    this.route.params.subscribe(val =>{
      this.id=val['id'];
      this.pS.countViews(this.id)
      this.pS.loadPost(this.id).subscribe(zal =>{
        this.pdata=zal;
        this.did=this.pdata.category.categoryid
        this.pS.loadSimilar(this.did).subscribe(fall=>{
          this.similarData=fall;
        })
         })
      });
      

    
    
  }



}
