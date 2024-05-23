import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';
import { ShelfComponent } from './shelf/shelf.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ShelfComponent],
  imports: [
    CommonModule,
    ShelfRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
  ],
})
export class ShelfModule {}
