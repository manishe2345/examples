import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {

  constructor(private uS:UsersService){}

  subForm!:FormData
  onsubscribe(formvalue:any){
    this.uS.subscribeUsers(formvalue);
  }
}
