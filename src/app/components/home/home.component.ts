import { Component, OnInit } from '@angular/core';
import { IddockService } from '../../services/iddock.service';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router'

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
  constructor(private router: Router, private iddockServ: IddockService, public utilServ: UtilService) { }

  ngOnInit() {

  }

  update(type: string, item: any) {
    this.router.navigate(['/update-info/' + type + '/' + this.utilServ.exgToFabAddress(item._id.substring(0, 42))]);
  }

  history(type: string, item: any) {
    this.router.navigate(['/history/' + type + '/' + this.utilServ.exgToFabAddress(item._id.substring(0, 42))]);
  }

  owner(type: string, item: any) {
    this.router.navigate(['/owner/' + type + '/' + this.utilServ.exgToFabAddress(item._id.substring(0, 42))]);
  }

  search() {
    this.iddockServ.findAll(this.type, this.id).subscribe(
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
