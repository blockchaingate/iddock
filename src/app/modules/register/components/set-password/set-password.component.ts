import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { WalletService } from '../../../../services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  name: string;
  pwd: string;
  repwd: string;
  pwdUnSatified: boolean;
  notSame: boolean;
  
  constructor(
    private route: Router,
    private localSt: LocalStorage,     
    private walletServ: WalletService) { }

  ngOnInit() {
    this.pwdUnSatified = false;
    this.notSame = false;
  }

  confirm() {
    const name = this.name;
    const pwd = this.pwd;
    const repwd = this.repwd;
    if(pwd != repwd) {
      this.notSame = true;
      return;
    }
    
    const globalRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#\(\)\$%\^&\*])(?=.{8,})/, 'g');

    if(!globalRegex.test(pwd)) {
      this.pwdUnSatified = true;
      return;
    }
    

    // const mnemonic = sessionStorage.mnemonic.trim().replace(/\s\s+/g, ' ');
    let mnemonic = sessionStorage.mnemonic;
    mnemonic = mnemonic.trim().replace(/\s\s+/g, ' ').replace(/(\r\n|\n|\r)/gm, '');
    const wallet = this.walletServ.generateWallet(pwd, name, mnemonic);

    sessionStorage.removeItem('mnemonic');    

    if (!wallet) {
      console.log('Error occured, please try again.');
    } else {
        this.localSt.getItem('ecomwallets').subscribe((wallets: any) => {
            if (!wallets) {
              wallets = {
                currentIndex: -1,
                items: []
              };
            }
            if (wallets.items.indexOf(wallet) < 0) {
              wallets.items.push(wallet);
              wallets.currentIndex ++;
            }
            this.localSt.setItem('ecomwallets', wallets).subscribe(() => {
                this.route.navigate(['/add-info']);
            });
        });

    }  
  }
}
