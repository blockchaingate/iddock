import { Component, OnInit, TemplateRef } from '@angular/core';
import { IddockService } from '../../services/iddock.service';
import {ActivatedRoute} from '@angular/router';
import { UtilService } from '../../services/util.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  id: string;
  type: string;
  data: any;
  saveSuccess: boolean;
  wallet: any;
  walletAddress: string;
  password: string;
  hash: string;
  passwordWrong: boolean;
  modalRef: BsModalRef;
  saveErr: string;

  constructor(
    private localSt: LocalStorage, 
    private modalService: BsModalService, 
    private route: ActivatedRoute, 
    private iddockServ: IddockService, 
    public utilServ: UtilService) { }

  ngOnInit() {

    this.localSt.getItem('ecomwallets').subscribe((wallets: any) => {

      if(!wallets || (wallets.length == 0)) {
        return;
      }
      this.wallet = wallets.items[wallets.currentIndex];
      
      this.loadWallet();

    });  

    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
    this.iddockServ.getDetail(this.type, this.id).subscribe(
      (ret: any) => {
        console.log('rettttt=', ret);
        if(ret && ret.ok) {
          this.data = ret._body;
          console.log('this.data=', this.data);
        }
      }
    );    
  }

  loadWallet() {
    const addresses = this.wallet.addresses;
    const walletAddressItem = addresses.filter(item => item.name == 'FAB')[0];
    this.walletAddress = walletAddressItem.address;
  }

  deleteItem(item) {
    this.data.nvs = this.data.nvs.filter(pair => pair != item);
  }

  addItem() {
    const item = {
      name: '',
      value: '',
      type: 0
    };
    this.data.nvs.push(
      item
    );
  }

  openModal(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(template);
  }  

  async update() {





    const seed = this.utilServ.aesDecryptSeed(this.wallet.encryptedSeed, this.password);    

    const nonce = parseInt(this.data._id.substring(42));
    const sequance = this.data._id.substring(0,42) + (nonce + 1).toString(16);;

    (await this.iddockServ.saveIdDockBySequence(seed, sequance, this.type, this.data.rfid, this.data.nvs)).subscribe(res => {
      if(res) {
        if(res.ok) {
          this.saveSuccess = true;
          //this.myid = this.utilServ.exgToFabAddress(res._body._id.substring(0, 42));
          this.saveErr = '';
        } else {
          //this.myid = '';
          this.saveSuccess = false;
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
    this.update();
  }

  warnPwdErr() {
      this.passwordWrong = true;
  }   


}
