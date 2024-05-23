import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../../../core/service/login/login.service';
import { ToastrService } from 'ngx-toastr';

export function roleControlGuard(role: string): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let service = inject(LoginService);
    let toastr = inject(ToastrService);
    let router = inject(Router);
    let result = service.hasRole(role);
    if (!result) {
      router.navigate(['./menu/home']);
      toastr.error(
        'You dont have permission to access to this page.',
        'Access Denied !!',
        {
          timeOut: 2000,
        }
      );
    }
    return result;
  };
}
