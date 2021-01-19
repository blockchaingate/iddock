import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { WalletService } from '../../services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string;
  password: string;
  repassword: string;
  mnemonic: string;

  constructor(
    private route: Router,
    private localSt: LocalStorage, 
    private walletServ: WalletService
  ) { }

  ngOnInit() {
  }

  login() {
    if(this.password != this.repassword) {
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
