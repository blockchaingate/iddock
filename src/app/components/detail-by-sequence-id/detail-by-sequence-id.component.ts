import { Component, OnInit } from '@angular/core';
import { IddockService } from '../../services/iddock.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-by-sequence-id',
  templateUrl: './detail-by-sequence-id.component.html',
  styleUrls: ['./detail-by-sequence-id.component.scss']
})
export class DetailBySequenceIDComponent implements OnInit {
    id: string;
    type: string;
    data: any;
    hash: string;
    constructor(private route: ActivatedRoute, private iddockServ: IddockService) { }
    ngOnInit() {
      this.type = this.route.snapshot.paramMap.get('type');
      this.id = this.route.snapshot.paramMap.get('id');
      console.log('thisid=', this.id);
      this.iddockServ.getDetail(this.type, this.id).subscribe(
        (ret: any) => {
          console.log('rettttt=', ret);
          if(ret && ret.ok) {
            this.data = ret._body;
            const owner = this.data.owner;
            this.iddockServ.getHashByAccount(owner, this.id).subscribe(
              (res: any) => {
                this.hash = res.hash;
              }
            );
          }
        }
      );
    }    
}