import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UtilService } from '../../services/util.service';
import { IddockService } from '../../services/iddock.service';

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
  id: string;
  walletAddress: string;
  nameValuePairs: any;
  modalRef: BsModalRef;
  passwordWrong: boolean;
  constructor(
    private localSt: LocalStorage, 
    private modalService: BsModalService, 
    private iddockServ: IddockService,
    private utilServ: UtilService) { }

  ngOnInit() {
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
  }

  openModal(template: TemplateRef<any>) {
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

    
    (await this.iddockServ.saveIdDock(seed, this.type, nvs)).subscribe(res => {
      console.log('res=', res);
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
}
