import { Component, OnInit } from '@angular/core';
import { IddockService } from '../../services/iddock.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
    id: string;
    type: string;
    data: any;
    hash: string;
    constructor(private route: ActivatedRoute, private iddockServ: IddockService) { }
    ngOnInit() {
      this.type = this.route.snapshot.paramMap.get('type');
      this.id = this.route.snapshot.paramMap.get('id');
      console.log('thisid=', this.id);
      this.iddockServ.getHistory(this.type, this.id).subscribe(
        (ret: any) => {
          console.log('rettttt=', ret);
          if(ret && ret.ok) {
            this.data = ret._body;
          }
        }
      );
    }    
}