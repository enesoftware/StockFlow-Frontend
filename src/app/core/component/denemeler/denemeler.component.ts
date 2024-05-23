import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ShelfService } from '../../../modules/service/shelf/shelf.service';
import { Subject } from 'rxjs';
import { Shelf } from '../../../modules/shelf/dto/shelf';
import DataTable, { Config } from 'datatables.net-dt';

@Component({
  selector: 'app-denemeler',
  templateUrl: './denemeler.component.html',
  styleUrl: './denemeler.component.scss',
})
export class DenemelerComponent implements AfterViewInit {
  constructor(public service: ShelfService) {}

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: Config = {};
  results: any = [];

  loadTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      data: this.results,
    };

    this.service.getShelves().subscribe((res: any) => {
      this.dtTrigger.next;
      this.results = res;
      console.log(this.results);
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next;
    this.loadTable();
  }
}
