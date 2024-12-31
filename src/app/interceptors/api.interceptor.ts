import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.getCurrentUser()?.token;

  // 克隆请求并添加 token
  const authReq = token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }) : req;

  return next(authReq).pipe(
    map(event => {
      // 只处理响应事件
      if (event instanceof HttpResponse) {
        // 假设后端返回的数据格式为 { code: number, data: any, message: string }
        const body = event.body as any;
        if (body && body.hasOwnProperty('data')) {
          // 创建新的响应，只返回 data 字段
          return event.clone({ body: body.data });
        }
      }
      return event;
    })
  );
}; 