import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit {
  @Input('appPermission') permission: string = '';

  constructor(
    private el: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.checkPermission()) {
      this.el.nativeElement.style.display = 'none';
    }
  }

  private checkPermission(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user || !user.permissions) {
      return false;
    }
    return user.permissions.includes(this.permission);
  }
} 