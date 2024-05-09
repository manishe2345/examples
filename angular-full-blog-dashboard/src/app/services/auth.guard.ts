import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {
  const aS:AuthService=inject(AuthService);


  if(aS.IsLoggedinGuard){
      return true;
  } else{
    return inject(Router).createUrlTree(['/login']);
    
  }

 
};
