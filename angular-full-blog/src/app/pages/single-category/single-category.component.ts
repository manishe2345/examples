import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private pS:PostService){}

   data!:string;
   catcards!:any;
   title!:string

   ngOnInit(): void {
     this.route.params.subscribe(val=>{
      this.data=val['id'];
      this.title=val['category']
      this.pS.loadCategory(this.data).subscribe(dal=>{
        this.catcards=dal;
      })
     })
   }

}
