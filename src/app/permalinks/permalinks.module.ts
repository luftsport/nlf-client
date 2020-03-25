import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfPermaLinksComponent } from './permalinks.component';
import { NlfPermalinksRoutingModule } from './permalinks-routing.module';

@NgModule({
  declarations: [NlfPermaLinksComponent],
  imports: [
    CommonModule,
    NlfPermalinksRoutingModule
  ]
})
export class NlfPermalinksModule { }
