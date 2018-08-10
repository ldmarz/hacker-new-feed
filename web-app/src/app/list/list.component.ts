import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(listService: ListService) {
    console.log(listService.hola());
  }

  ngOnInit() {
  }

}
