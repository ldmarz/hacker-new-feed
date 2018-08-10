import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ListService {

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(serverURL + 'list');
  }

  deleteItem(_id) {
    return this.http.post(serverURL + 'deleteItem', { _id });
  }
}
