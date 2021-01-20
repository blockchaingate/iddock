import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Web3Service } from './web3.service';
import { UtilService } from './util.service';
import { CoinService } from './coin.service';
import { KanbanService } from './kanban.service';
import { environment } from 'src/environments/environment';

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


  saveDock(type: string, data: any) {
    const url = 'iddock/Create/' + type;  
    return this.http.post(url, data, false);   
  }

  findAll(type: string, id: string) {
    const url = 'iddock/findById/' + type + '/' + id;
    return this.http.get(url, false);
  }
  
  getHashByAccount(owner: string, id: string) {
    const url = environment.endpoints.kanban + 'ecombar/getHashByAccount/' + owner + '/' + id;
    return this.http.getRaw(url);
  }
   
  getDetail(type: string, id: string) {
    if(!type) {
      type = 'people';
    }
    const url = 'iddock/getDetail/' + type + '/' + id;
    console.log('url=', url);
    return this.http.get(url, false);
  }

  getHistory(type: string, id: string) {
    if(!type) {
      type = 'people';
    }
    const url = 'iddock/getHistory/' + type + '/' + id;
    return this.http.get(url, false);
  }

  async getNonce(type: string, id: string) {
    const url = 'iddock/getNonce/' + type + '/' + id;
    console.log('url for getNonce=', url);
    const ret = await this.http.get(url, false).toPromise();
    if(ret && ret.ok) {
      return ret._body;
    }
    return -1;
  } 

  async saveIdDockBySequence(seed, sequence: string, type: string, rfid: string, nvs: any) {
    let nvsString = JSON.stringify(nvs);
    if(type == 'organization' || type == 'things') {
      nvsString = 'rfid=' + rfid + '&' + nvsString;
    }
    const keyPairsKanban = this.coinServ.getKeyPairs('FAB', seed, 0, 0, 'b');   
    const exgAddress = this.utilServ.fabToExgAddress(keyPairsKanban.address);

    
    const selfSign = this.coinServ.signedMessage(nvsString, keyPairsKanban);
    const selfSignString = this.utilServ.stripHexPrefix(selfSign.r)  + this.utilServ.stripHexPrefix(selfSign.s) + this.utilServ.stripHexPrefix(selfSign.v);
    const datahash = this.web3Serv.getHash(nvsString);

    const data = {
        _id: sequence,
        selfSign: selfSignString,
        transferSig: null,
        owner: null,
        rfid: null,
        nvs: nvs,
        datahash: datahash,
        txhex: ''
    }

    if(type == 'organization' || type == 'things') {
      data.owner = exgAddress;
      data.rfid = rfid;
      data.selfSign = null;
      data.transferSig = selfSignString;
    }
    
    const txhex = await this.getTxhex(keyPairsKanban, data);
    data.txhex = txhex;
    return this.saveDock(type, data);

  }
  async saveIdDock(seed, id: string, type: string, rfid: string, nvs: any, nonce: number) {

    const hexString = nonce.toString(16);
    id = type == 'people' ? this.utilServ.fabToExgAddress(id) : this.web3Serv.sha3(id).substring(0, 42) + hexString;

    return await this.saveIdDockBySequence(seed, id, type, rfid, nvs);


  }
}

