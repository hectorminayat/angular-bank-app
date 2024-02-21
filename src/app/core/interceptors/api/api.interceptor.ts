import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if(environment.apiUrl && environment.authorId) {
    const cloned = req.clone({
      url: `${environment.apiUrl}/${req.url}`,
      setHeaders: {
        authorId: environment.authorId,
      },
    });
  
    return next(cloned);
  }
  return next(req)

};
