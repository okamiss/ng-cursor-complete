import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../../models/menu.interface';
import { PermissionDirective } from '../../directives/permission.directive';

@Component({
  selector: 'app-recursive-menu',
  templateUrl: './recursive-menu.component.html',
  styleUrls: ['./recursive-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    PermissionDirective
  ]
})
export class RecursiveMenuComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() level: number = 0;

  private static expandedPanels: { [key: string]: boolean } = {};

  getChildMenuItems(item: MenuItem): MenuItem[] {
    return item.children || [];
  }

  togglePanel(itemId: string): void {
    RecursiveMenuComponent.expandedPanels[itemId] = !RecursiveMenuComponent.expandedPanels[itemId];
  }

  isPanelExpanded(itemId: string): boolean {
    return RecursiveMenuComponent.expandedPanels[itemId] ?? false;
  }

  hasChildren(item: MenuItem): boolean {
    return Array.isArray(item.children) && item.children.length > 0;
  }

  shouldShowMenuItem(item: MenuItem): boolean {
    return item.link !== undefined || this.hasChildren(item);
  }
} 