import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
email!:any
IsLoggedin$!:Observable<boolean>

constructor(private router:Router, private aS:AuthService){}

ngOnInit(): void {
  this.email=JSON.parse(localStorage.getItem('user') as string).email;
  this.IsLoggedin$=this.aS.isLoggedIn();

}

onlogout(){
    this.aS.logout();
}

 

}
