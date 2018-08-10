import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listPost: { data: any };
  listService: ListService;

  constructor(listService: ListService) {
    listService.getList()
      .subscribe(result => {
        this.listPost = _.get(result, 'data');
      });

    this.listService = listService;
  }

  ngOnInit() {

  }

  parseDate(parseDate) {
    const momentDate = moment(parseDate);
    const now = moment();
    if (now.isSame(momentDate, 'day')) {
      return momentDate.format('HH:mm A');
    }

    return moment(parseDate).fromNow();
  }

  async deleteItem(e, _id) {
    e.preventDefault();
    this.listService.deleteItem(_id)
      .subscribe(result => {
        if (_.get(result, 'data.deleted')) {
          _.remove(this.listPost, { _id });
        }
      });
  }

}
