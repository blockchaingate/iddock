import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UtilService } from '../../services/util.service';
import { IddockService } from '../../services/iddock.service';
import { KanbanService } from '../../services/kanban.service';
import { HttpClient} from '@angular/common/http';
import { AirdropService } from '../../services/airdrop.service';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})

export class AddInfoComponent implements OnInit {
  wallet: any;
  type: string;
  password: string;
  saveErr: string;
  id: string;
  parents: any;

  _hasParents: boolean;
  get hasParents(): boolean {
      return this._hasParents;
  }
  set hasParents(value: boolean) {
      this._hasParents = value;
      console.log('value for hasParents=', value);
      if(value) {
        if(!this.parents) {
          this.parents = [
            {
              _id: '',
              qty: 0,
              typ: ''
            }
          ];
          console.log('parents=', this.parents);
        }
      }
  }

  gas: number;
  myid: string;
  rfid: string;
  error: any;
  typeMissing: boolean;
  walletAddress: string;
  nameValuePairs: any;
  publicIP: string;
  question: string;
  getFreeGasResult: number;
  questionair_id: string;
  answer: string;

  modalRef: BsModalRef;
  getFreeGasModalRef: BsModalRef;
  passwordWrong: boolean;
  constructor(
    private http: HttpClient,
    private airdropServ: AirdropService,
    private localSt: LocalStorage, 
    private kanbanServ: KanbanService,
    private modalService: BsModalService, 
    private iddockServ: IddockService,
    private utilServ: UtilService) { }

  ngOnInit() {
    this.hasParents = false;
    this.getFreeGasResult = 0;
    this.http.get('https://api.ipify.org?format=json').subscribe(data => {
      this.publicIP=data['ip'];

     
    });
    this.type = 'people';
    this.typeMissing = false;
    this.passwordWrong = false;
    this.nameValuePairs = [
      {
        name: '',
        value: '',
        type: 0
      },
      {
        name: '',
        value: '',
        type: 0
      }      
    ];
    this.localSt.getItem('ecomwallets').subscribe((wallets: any) => {

      if(!wallets || (wallets.length == 0)) {
        return;
      }
      this.wallet = wallets.items[wallets.currentIndex];
      
      this.loadWallet();

    });    
  }

  addItem() {
    const item = {
      name: '',
      value: '',
      type: 0
    };
    this.nameValuePairs.push(
      item
    );
  }
  loadWallet() {
    const addresses = this.wallet.addresses;
    const walletAddressItem = addresses.filter(item => item.name == 'FAB')[0];
    this.walletAddress = walletAddressItem.address;
    this.refreshGas();
  }

  getFreeGas(template: TemplateRef<any>) {

    this.error = null;
    this.airdropServ.getQuestionair(this.walletAddress, this.publicIP).subscribe(
        (res: any) => {
            if(res) {
                const data = res._body;
                if(res.ok) {
                    
                    console.log('data=', data);
                    this.question = data.question;
                    this.questionair_id = data._id;

                    this.getFreeGasModalRef = this.modalService.show(template);
                } else {
                    this.error = data;
                }

            }
        }
    ); 
  }

  refreshGas() {
    this.kanbanServ.getKanbanBalance(this.utilServ.fabToExgAddress(this.walletAddress)).subscribe(
        (resp: any) => {
            // console.log('resp=', resp);
            const fab = this.utilServ.stripHexPrefix(resp.balance.FAB);
            this.gas = this.utilServ.hexToDec(fab) / 1e18;

        },
        error => {
            // console.log('errorrrr=', error);
        }
    );
}

addParentItem() {
  this.parents.push(
    {
      _id: '',
      qty: 0,
      typ: ''
    }    
  );
}

  openModal(template: TemplateRef<any>) {
    if(!this.type) {
      this.typeMissing = true;
      return;
    }    
    this.modalRef = this.modalService.show(template);
  }

  async add() {

    const nvs = [];
    for(let i=0;i<this.nameValuePairs.length;i++) {
      const item = this.nameValuePairs[i];
      nvs.push(
        {
            name: item.name,
            value: item.value
        }
    );      
    }



    const seed = this.utilServ.aesDecryptSeed(this.wallet.encryptedSeed, this.password);    

    const nonce = 0;
    const id = (this.type == 'people' ? this.walletAddress : this.rfid);
    (await this.iddockServ.saveIdDock(seed, id, this.type, this.rfid, nvs, this.parents,  nonce)).subscribe(res => {
      console.log('ress=', res);
      if(res) {
        if(res.ok) {
          console.log('res.body._id=', res._body._id);
          this.myid = this.utilServ.exgToFabAddress(res._body._id.substring(0, 42));
          console.log('this.myid=', this.myid);
          this.saveErr = '';
        } else {
          this.myid = '';
          this.saveErr = 'Duplicated id';
        }
        
      }
    });

  }

  confirmPassword() {
    const pinHash = this.utilServ.SHA256(this.password).toString();
    if (pinHash !== this.wallet.pwdHash) {
        this.warnPwdErr();
        return;
    }
    this.modalRef.hide();
    this.add();
  }

  warnPwdErr() {
      this.passwordWrong = true;
  }   
  
  onSubmit() {
    this.airdropServ.answerQuestionair(this.walletAddress, this.questionair_id, this.answer).subscribe(
        (res: any) => {
            if(res) {
                if(res.ok) {
                  this.getFreeGasResult = 1;
                } else {
                  this.getFreeGasResult = -1;
                }
                

                this.getFreeGasModalRef.hide();
            } 
                        
        }
    );
}  

}
