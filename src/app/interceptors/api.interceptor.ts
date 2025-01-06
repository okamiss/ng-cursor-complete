import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getCurrentUser()?.token;

  // 克隆请求并添加 token
  const authReq = token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }) : req;

  return next(authReq).pipe(
    map(event => {
      // 只处理响应事件
      if (event instanceof HttpResponse) {
        const body = event.body as any;
        if (body) {
          // 假设后端返回的数据格式为 { code: number, data: any, message: string }
          if (body.code !== 1) {
            // 显示错误消息
            console.log(body.message || '操作失败');
            throw new Error(body.message);
          }
          if (body.hasOwnProperty('data')) {
            return event.clone({ body: body.data });
          }
        }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // 未授权，跳转到登录页
        console.log('登录已过期，请重新登录');
        authService.logout();
        router.navigate(['/login']);
      } else if (error.status === 403) {
        console.log('没有权限执行此操作');
      } else if (error.status === 404) {
        console.log('请求的资源不存在');
      } else if (error.status === 500) {
        console.log('服务器错误，请稍后重试');
      } else {
        console.log(error.message || '操作失败，请重试');
      }
      return throwError(() => error);
    })
  );
}; 