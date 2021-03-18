import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { WalletService } from '../../services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  name: string;
  password: string;
  repassword: string;
  mnemonic: string;
  pwdUnSatified: boolean;
  notSame: boolean;


  constructor(
    private route: Router,
    private localSt: LocalStorage, 
    private walletServ: WalletService
  ) { }

  ngOnInit() {
    this.pwdUnSatified = false;
    this.notSame = false;
  }

  import() {
    if(this.password != this.repassword) {
      return;
    }

    const globalRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#\(\)\$%\^&\*])(?=.{8,})/, 'g');

    if(!globalRegex.test(this.password)) {
      this.pwdUnSatified = true;
      return;
    }

    const wallet = this.walletServ.generateWallet(this.password, this.name, this.mnemonic);
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
