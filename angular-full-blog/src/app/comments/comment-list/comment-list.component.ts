import { Component,Input,OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Comment } from 'src/app/interfaces/comments';

interface abject {
  id:string,
  data:any
}

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() pid!:string;
  commentarray:Array<abject>=[]

  constructor(private uS:UsersService){}

  ngOnChanges(changes:SimpleChanges){
    this.getit();
  }

  ngOnInit(): void {
    
  }



  getit(){
    this.uS.getcomments(this.pid).subscribe(val=>{
      this.commentarray=val;
      console.log(this.commentarray)
    })
  }

}
