import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../dto/item';
import { ItemService } from '../../service/item/item.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemDialogComponent } from '../../../shared/component/create-item-dialog/create-item-dialog.component';
import { ItemCreate } from '../dto/itemCreate';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { ItemInOutDialogComponent } from '../../../shared/component/item-in-out-dialog/item-in-out-dialog.component';
import { ItemInOut } from '../dto/itemInOut';
import { LoginService } from '../../../core/service/login/login.service';
import { CreateReportDialogComponent } from '../../../shared/component/create-report-dialog/create-report-dialog.component';
import { HomeService } from '../../service/home/home.service';
import { CreateReportDTO } from '../../../shared/dto/createReportDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  itemCreate: ItemCreate = { name: '', quantity: 0, min_quantity: 0 };
  itemInOut: ItemInOut = { name: '', count: 0, operator: false };
  role = this.loginService.getRole();

  reportCreate: CreateReportDTO = {
    itemName: '',
    userEmail: '',
    description: '',
  };

  constructor(
    private itemService: ItemService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private loginService: LoginService,
    private homeService: HomeService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: any;
  displayedColumns: string[] = ['name', 'min_quantity', 'total', 'actions'];

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  ngOnInit(): void {
    this.refreshItems();
  }

  refreshItems() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Item>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.items = data;
      },
    });
  }

  newItem(): void {
    let dialog = this.dialog.open(CreateItemDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        console.log(response.object.value.name);

        if (response != undefined) {
          this.itemCreate.name = response.object.value.name;
          this.itemCreate.quantity = response.object.value.quantity;
          this.itemCreate.min_quantity = response.object.value.min_quantity;
          console.log(this.itemCreate);
          this.itemService.addItem(this.itemCreate).subscribe({
            next: (response) => {
              this.refreshItems();
              this.toastr.info('item added', 'Item System', {
                timeOut: 2000,
              });
            },
            error: (err) => {
              this.toastr.error('There is not any empty shelf');
            },
          });
        }
      },
    });
  }

  delete(name: string) {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response?.result == true) {
          this.itemService.deleteItem(name).subscribe({
            next: (response) => {
              this.refreshItems();
              if (response == true) {
                this.toastr.info('item deleted', 'Item System', {
                  timeOut: 2000,
                });
              }
            },
            error: (err) => {
              this.toastr.error(
                'You need to check report/shelves to this item',
                'Item System',
                {
                  timeOut: 2000,
                }
              );
              console.log(err);
            },
          });
        }
      },
    });
  }

  itemAdd(name: string) {
    let dialog = this.dialog.open(ItemInOutDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });
    dialog.componentInstance.question = 'How many do you want to add';
    dialog.componentInstance.buttonName = 'Add Item';
    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != undefined) {
          this.itemInOut.name = name;
          this.itemInOut.operator = true;
          this.itemInOut.count = response.object.value.quantity;

          this.itemService.inOutItem(this.itemInOut).subscribe({
            next: (response) => {
              this.refreshItems();
              this.toastr.info('Item Added', 'Item System', {
                timeOut: 2000,
              });
            },
            error: (err) => {
              this.toastr.error('error occured', 'Item System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
      error: (err) => {
        this.toastr.error('error occured', 'Item System', {
          timeOut: 2000,
        });
      },
    });
  }

  itemRemove(name: string) {
    let dialog = this.dialog.open(ItemInOutDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });
    dialog.componentInstance.question = 'How many do you want to remove';
    dialog.componentInstance.buttonName = 'Remove Item';
    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != undefined) {
          this.itemInOut.name = name;
          this.itemInOut.operator = true;
          this.itemInOut.count = response.object.value.quantity;
          this.itemService.inOutItem(this.itemInOut).subscribe({
            next: () => {
              this.refreshItems();
              this.toastr.info('Item Exported', 'Item System', {
                timeOut: 2000,
              });
            },
            error: (err) => {
              this.toastr.error('error occured', 'Item System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
      error: (err) => {
        this.toastr.error('error occured', 'Item System', {
          timeOut: 2000,
        });
      },
    });
  }

  createReport(name: string) {
    let dialog = this.dialog.open(CreateReportDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
      data: {
        userEmail: this.loginService.getEmail(),
        itemName: name,
      },
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response?.object != undefined) {
          this.reportCreate.userEmail = response.object.value.userEmail;
          this.reportCreate.itemName = response.object.value.itemName;
          this.reportCreate.description = response.object.value.description;
          this.homeService.createReport(this.reportCreate).subscribe({
            next: (resp) => {
              this.refreshItems();
              this.toastr.info('Report created !', 'Report System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
    });
  }
}
