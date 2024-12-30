import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/menu.interface';

@Component({
  selector: 'app-recursive-menu',
  templateUrl: './recursive-menu.component.html',
  styleUrls: ['./recursive-menu.component.scss'],
  standalone: false
})
export class RecursiveMenuComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() level: number = 0;

  constructor() {
    console.log(this.menuItems,'menuItems');
    console.log(this.level,'level');
  }

  // 使用静态属性来共享展开状态
  private static expandedPanels: { [key: string]: boolean } = {};

  getChildMenuItems(item: MenuItem): MenuItem[] {
    return item.children || [];
  }

  // 切换面板展开状态
  togglePanel(itemId: string): void {
    RecursiveMenuComponent.expandedPanels[itemId] = !RecursiveMenuComponent.expandedPanels[itemId];
  }

  // 检查面板是否展开
  isPanelExpanded(itemId: string): boolean {
    return RecursiveMenuComponent.expandedPanels[itemId] ?? false;
  }

  // 检查是否有子菜单
  hasChildren(item: MenuItem): boolean {
    return Array.isArray(item.children) && item.children.length > 0;
  }

  // 检查是否应该显示菜单项
  shouldShowMenuItem(item: MenuItem): boolean {
    return item.link !== undefined || this.hasChildren(item);
  }
} 