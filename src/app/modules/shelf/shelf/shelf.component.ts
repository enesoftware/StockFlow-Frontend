import { Component, OnInit, ViewChild } from '@angular/core';
import { ShelfService } from '../../service/shelf/shelf.service';
import { Shelf } from '../dto/shelf';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { CreateShelfDialogComponent } from '../../../shared/component/create-shelf-dialog/create-shelf-dialog.component';
import { EditShelfComponent } from '../../../shared/component/edit-shelf/edit-shelf.component';
import { LoginService } from '../../../core/service/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrl: './shelf.component.scss',
})
export class ShelfComponent implements OnInit {
  shelves: Shelf[] = [];
  role = this.loginService.getRole();

  constructor(
    private shelfService: ShelfService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {}

  dataSource: any;
  displayedColumns: string[] = [
    'no',
    'capacity',
    'quantity',
    'emptySpace',
    'itemName',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // ngAfterViewInit() {}

  ngOnInit(): void {
    this.refreshShelves();
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  refreshShelves() {
    this.shelfService.getShelves().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Shelf>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.shelves = data;
      },
    });
  }

  edit(no: number) {
    let dialog = this.dialog.open(EditShelfComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });
    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != undefined) {
          this.shelfService
            .editShelf(no, response.object.value.quantity)
            .subscribe({
              next: (resp) => {
                if (resp.result != 0) {
                  this.toastr.info('Item Removed!', 'Shelf System', {
                    timeOut: 2000,
                  });
                  this.refreshShelves();
                }
              },
            });
        }
      },
    });
  }

  deleteShelf(no: number): void {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response?.result == true) {
          this.shelfService.deleteItem(no).subscribe({
            next: (data) => {
              this.refreshShelves();
              // console.log('data==>' + data);
              if (data == true) {
                this.toastr.info('Shelf deleted', 'Shelf System', {
                  timeOut: 2000,
                });
              } else {
                this.toastr.error('Shelf has an item', 'Shelf System', {
                  timeOut: 2000,
                });
              }
            },
            error: (err) => {
              this.toastr.error('error', 'Shelf System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
    });
  }

  addShelf() {
    let dialog = this.dialog.open(CreateShelfDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        // console.log('shelf-componenet ' + response);
        if (response != undefined) {
          this.shelfService.addShelf(response.result).subscribe({
            next: (resp) => {
              this.refreshShelves();
              if (resp == 0 && resp != undefined) {
                this.toastr.error('Can`t add shelf', 'Shelf System', {
                  timeOut: 2000,
                });
              } else {
                this.toastr.info('shelves added', 'Shelf System', {
                  timeOut: 2000,
                });
              }
            },
            error: (err) => {
              this.toastr.error('error occured', 'Shelf System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
    });
  }
}
