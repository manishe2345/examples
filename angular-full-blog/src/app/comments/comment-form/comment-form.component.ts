import { Component,Input } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {

  constructor(private uS:UsersService){}

  @Input() pid!:string

  commentForm!: FormGroup


  onpost(formvalue:any){
  const comment:string=formvalue.comment;
  const name:string=formvalue.name;
  let date= new Date();

  const commentdata:any={
    name:name,
    email:comment,
    postid:this.pid,
    createdat:date
  };
  this.uS.submitComment(commentdata);
  this.commentForm.reset()

  
  }





}
