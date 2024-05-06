import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Past } from 'src/app/interfaces/past';


interface dota {
  id:string,
  data:any
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

    @Input() cads!:dota;
    @Input() lat!:dota;
    @Input() catd!:any;
    

  constructor (private pS:PostService){}

  ngOnInit(): void {
    }

}
