import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    constructor(private aS:AuthService){}

    ngOnInit(): void {
    }


  onsubmit(formValue:any){
    this.aS.login(formValue.email,formValue.password)
  };

}
