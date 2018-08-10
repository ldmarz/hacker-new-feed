import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatIconModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class AngularMaterialModule { }
