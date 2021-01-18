import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
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
    private walletServ: WalletService
  ) { }

  ngOnInit() {
  }

  login() {
    if(this.password != this.repassword) {
      return;
    }

    console.log('this.mnemonic=', this.mnemonic);
    const wallet = this.walletServ.generateWallet(this.password, this.name, this.mnemonic);
    console.log('wallet=', wallet);
  }
}
