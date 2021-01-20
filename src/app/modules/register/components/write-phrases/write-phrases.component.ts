import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../../services/wallet.service';

@Component({
  selector: 'app-write-phrases',
  templateUrl: './write-phrases.component.html',
  styleUrls: ['./write-phrases.component.scss']
})
export class WritePhrasesComponent implements OnInit {
  mnemonics: string[] = [];
  constructor(private walletServ: WalletService) { }

  ngOnInit() {
    this.mnemonics = [];
    this.generateMnemonic();
  }
  generateMnemonic() {
    // if (!sessionStorage.mnemonic) {
    const mnemonic = this.walletServ.generateMnemonic();
    sessionStorage.mnemonic = mnemonic;
    // }
    this.mnemonics.push(...(sessionStorage.mnemonic.split(' ', 12)));
    console.log('this.mnemonics=' ,this.mnemonics );
    
    // this.mnemonics = ['trip', 'return', 'arrange', 'version', 'horn', 'mountain', 'trend', 'tissue', 'alter', 'rug', 'push', 'era'];
}
}
