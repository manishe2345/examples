import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedi:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  IsLoggedinGuard:boolean=false

  constructor(private afauth:AngularFireAuth, private tS:ToastrService, private router:Router) { }


  login(email:string,password:string){
    this.afauth.signInWithEmailAndPassword(email,password).then(auth=>{
      this.tS.success('success');
      this.loadUser();
      this.IsLoggedinGuard=true
      this.loggedi.next(true);
      this.router.navigate(['/']);
    }).catch(e =>{
      this.tS.warning(e)
    });
  }


  loadUser(){
    this.afauth.authState.subscribe(val => {
      localStorage.setItem("user",JSON.stringify(val))
      
    })
  }


  logout(){
    this.afauth.signOut().then(()=>{
      this.tS.success('logged out successfully');
      this.router.navigate(['/login']);
      this.loggedi.next(false);
      this.IsLoggedinGuard=false
      localStorage.removeItem('user');
    })
  };
 


  isLoggedIn(){
    return this.loggedi.asObservable();
  }
}
