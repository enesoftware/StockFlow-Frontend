import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + localStorage.getItem('token'),
  });

  let url = req.url;
  if (!url.startsWith('/assets/')) {
    url = 'http://localhost:8080/api/v1' + url;
  }

  let newReq = req.clone({
    url,
    headers,
  });

  return next(newReq);
};
