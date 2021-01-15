import { Component, OnInit } from '@angular/core';

import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AddInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
