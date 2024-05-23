import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shelf } from '../../shelf/dto/shelf';

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  constructor(private httpClient: HttpClient) {}
  getShelves(): Observable<Shelf[]> {
    return this.httpClient.get<Shelf[]>('/shelf/get');
  }

  deleteItem(no: number): Observable<any> {
    return this.httpClient.post('/shelf/delete', {
      no,
    });
  }

  addShelf(count: number): Observable<any> {
    return this.httpClient.post('/shelf/add', {
      count,
    });
  }

  editShelf(no: number, quantity: number): Observable<any> {
    return this.httpClient.post('/shelf/edit', {
      no,
      quantity,
    });
  }
}
