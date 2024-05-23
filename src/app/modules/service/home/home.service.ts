import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../home/dto/report';
import { CreateReportDTO } from '../../../shared/dto/createReportDTO';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>('/report');
  }

  closeReport(id: number): Observable<any> {
    return this.httpClient.post('/report/close', {
      id,
    });
  }

  openReport(id: number): Observable<any> {
    return this.httpClient.post('/report/open', {
      id,
    });
  }
  deleteReport(id: number): Observable<any> {
    return this.httpClient.post('/report/delete', {
      id,
    });
  }
  createReport(dto: CreateReportDTO): Observable<any> {
    return this.httpClient.post('/report/create', dto);
  }
}
