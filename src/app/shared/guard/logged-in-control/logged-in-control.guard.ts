import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../../../core/service/login/login.service';
import { ToastrService } from 'ngx-toastr';

export function loggedInControlGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let service = inject(LoginService);
    let toastr = inject(ToastrService);
    let router = inject(Router);
    let result = service.tokenControl();

    if (!result) {
      router.navigate(['./login']);
      toastr.error('Please login again', 'Token Expired !!', {
        timeOut: 2000,
      });
      localStorage.clear();
    }

    return result;
  };
}
