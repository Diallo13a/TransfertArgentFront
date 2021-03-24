import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class LoginInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = JSON.parse(localStorage.getItem('token') as string);
    // console.log(token.token);
    if (token) {
       req = req.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${token.token}`,
            // Accept: 'Application/json'
          }
        }
      );
      // return next.handle(req);
    }
    // else {
    return next.handle(req);
    // }

  }
}

export const LoginInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoginInterceptor,
  multi: true
};
