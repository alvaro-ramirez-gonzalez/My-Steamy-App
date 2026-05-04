import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    setHeaders: {
      'User-Agent': 'MySteamyApp/1.0 (contact@ejemplo.com)'
    }
  });
  return next(apiReq);
};