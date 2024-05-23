import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../service/home/home.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from '../../home/dto/report';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: any;
  displayedColumns: string[] = [
    'userEmail',
    'user',
    'description',
    'itemName',
    'actions',
  ];
  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  reports: Report[] = [];

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.homeService.getReports().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Report>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.reports = data;
      },
    });
  }

  openCloseReport(id: number, isActive: boolean) {
    if (isActive == true) {
      this.homeService.closeReport(id).subscribe({
        next: () => {
          this.refreshTable();
          this.toastr.info('Report Closed!', 'Report System', {
            timeOut: 2000,
          });
        },
      });
    } else {
      this.homeService.openReport(id).subscribe({
        next: () => {
          this.refreshTable();
          this.toastr.info('Report Opened!', 'Report System', {
            timeOut: 2000,
          });
        },
      });
    }
  }

  deleteReport(id: number) {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      backdropClass: 'blurBackGround',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response?.result == true) {
          this.homeService.deleteReport(id).subscribe({
            next: () => {
              this.refreshTable();
              this.toastr.error('Report Deleted!', 'Report System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
    });
  }
}
