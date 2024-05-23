import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShelfComponent } from './shelf/shelf.component';

const routes: Routes = [
  { path: '', component: ShelfComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShelfRoutingModule {}
