import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Web3Service } from './web3.service';
import { UtilService } from './util.service';
import { CoinService } from './coin.service';
import { KanbanService } from './kanban.service';

@Injectable({ providedIn: 'root' })
export class IddockService {
  constructor(
    private web3Serv: Web3Service,
    private kanbanServ: KanbanService,
    private utilServ: UtilService,
    private coinServ: CoinService,
    private http: HttpService
    ) { }

   async getTxhex(keyPairsKanban, data: any) {
     const id = data._id;
    console.log('id=', id);
    const hash = data.datahash;
    console.log('hash=', hash);
    const abiHex = this.web3Serv.getAddRecordABI(id, hash);
   // const abiHex = this.web3Serv.getAddRecordABI('111', '222');
    const recordAddress = this.kanbanServ.getRecordAddress();
    const nonce = await this.kanbanServ.getTransactionCount(this.utilServ.fabToExgAddress(keyPairsKanban.address));
    const txKanbanHex = await this.web3Serv.signAbiHexWithPrivateKey(abiHex, keyPairsKanban, recordAddress, nonce, 0, null);
    return txKanbanHex;
 
  }


  saveId(data: any) {
    const url = 'iddock/Create/id' ;  
    return this.http.post(url, data, false);   
  }

  findAll(type: string, id: string) {
    const url = 'iddock/findById/' + type + '/' + id;
    return this.http.get(url);
  }
  
  getDetail(type: string, id: string) {
    if(!type) {
      type = 'all';
    }
    const url = 'iddock/getDetail/' + type + '/' + id;
    console.log('url=', url);
    return this.http.get(url);
  }

  async getNonce(type: string, id: string) {
    const url = 'iddock/getNonce/' + type + '/' + id;
    console.log('url for getNonce=', url);
    const ret = await this.http.get(url).toPromise();
    if(ret && ret.ok) {
      return ret._body;
    }
    return -1;
  } 

  async saveIdDock(seed, type: string, nvs: any) {
    const nvsString = JSON.stringify(nvs);
    
    const keyPairsKanban = this.coinServ.getKeyPairs('FAB', seed, 0, 0, 'b');   
    const exgAddress = this.utilServ.fabToExgAddress(keyPairsKanban.address);
    const nonce = await this.getNonce(type, exgAddress);
    console.log('nonce===', nonce);
    const hexString = nonce.toString(16);
    const id = exgAddress + hexString;
    console.log('iddddd=', id);
    
    const selfSign = this.coinServ.signedMessage(nvsString, keyPairsKanban);
    const selfSignString = this.utilServ.stripHexPrefix(selfSign.r)  + this.utilServ.stripHexPrefix(selfSign.s) + this.utilServ.stripHexPrefix(selfSign.v);
    const datahash = this.web3Serv.getHash(nvsString);

    const data = {
        _id: id,
        selfSign: selfSignString,
        nvs: nvs,
        datahash: datahash,
        txhex: ''
    }

    const txhex = await this.getTxhex(keyPairsKanban, data);
    data.txhex = txhex;
    return this.saveId(data);

  }
}

