import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateShelfDialogComponent } from './component/create-shelf-dialog/create-shelf-dialog.component';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateItemDialogComponent } from './component/create-item-dialog/create-item-dialog.component';
import { ItemInOutDialogComponent } from './component/item-in-out-dialog/item-in-out-dialog.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { SuccessDialogComponent } from './component/success-dialog/success-dialog.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { EditShelfComponent } from './component/edit-shelf/edit-shelf.component';
import { CreateReportDialogComponent } from './component/create-report-dialog/create-report-dialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    CreateShelfDialogComponent,
    DeleteDialogComponent,
    CreateItemDialogComponent,
    ItemInOutDialogComponent,
    AddUserComponent,
    SuccessDialogComponent,
    UpdateUserComponent,
    EditShelfComponent,
    CreateReportDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatTooltipModule,
  ],
})
export class SharedModule {}
