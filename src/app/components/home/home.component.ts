import { Component, OnInit } from '@angular/core';
import { IddockService } from '../../services/iddock.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  id: string;
  type: string;
  people: any;
  things: any;
  organization: any;
  constructor(private iddockServ: IddockService, private utilServ: UtilService) { }

  ngOnInit() {

  }
  search() {
    console.log('this.id===', this.id);
    //let internalId = this.utilServ.fabToExgAddress(this.id);
    let internalId = this.id;
    internalId = internalId.substring(2);
    this.iddockServ.findAll(this.type, internalId).subscribe(
      (ret) => {
        console.log('ret==', ret);
        if(ret && ret.ok) {
          const body = ret._body;
          this.people = body.people;
          this.things = body.things;
          this.organization = body.organization;
        }
      }
    );
  }
}
