import { Component, Input} from '@angular/core';

 @Component({
 selector: 'nlf-content-tree',
 template: `
 <div *ngIf="!tree.parent">
  <a *ngIf="tree._id!==current" [routerLink]="['/content/view', tree.space_key, tree.slug]">{{ tree.title }}</a>
  <span *ngIf="tree._id===current" class="text-muted">{{ tree.title }}</span>
 </div>
 <ul style="list-style: none">
   <li *ngFor="let tree of tree.children">
   <span *ngIf="!!tree.parent">
    <a *ngIf="tree._id!==current" [routerLink]="['/content/view', tree.space_key, tree.slug]">{{ tree.title }}</a>
    <span *ngIf="tree._id===current" class="text-muted">{{ tree.title }}</span>
  </span>
     <nlf-content-tree  [tree]="tree" [current]="current"></nlf-content-tree>
   </li>
 </ul>
 `
})
export class NlfContentTreeComponent {
  
  @Input() tree;
  @Input() current: string;

  constructor() {}
}
