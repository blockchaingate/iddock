import { Component, OnInit } from '@angular/core';
import { IddockService } from '../../services/iddock.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    id: string;
    data: any;
    constructor(private route: ActivatedRoute, private iddockServ: IddockService) { }
    ngOnInit() {

      this.id = this.route.snapshot.paramMap.get('id');
      console.log('thisid=', this.id);
      this.iddockServ.findAll('', this.id).subscribe(
        (ret: any) => {
          console.log('rettttt=', ret);
          if(ret && ret.ok) {
            this.data = ret._body;
          }
        }
      );
    }    
}