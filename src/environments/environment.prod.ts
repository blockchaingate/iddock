import * as Btc from 'bitcoinjs-lib';

export const environment = {
  production: true,
  appid: '5b6a8688905612106e976a69',
  endpoints: {
    prod: 'https://api.blockchaingate.com/v2/',
    blockchaingate: 'https://api.blockchaingate.com/v2/',
    website: 'http://ecombar.com/',
    kanban: 'https://kanbanprod.fabcoinapi.com/',
    BTC: {
      exchangily: 'https://btcprod.fabcoinapi.com/'
    },
    FAB: {
        exchangily: 'https://fabprod.fabcoinapi.com/'
    },
    ETH: {
        exchangily: 'https://ethprod.fabcoinapi.com/',
    },
    BCH: {
        exchangily: 'https://bchprod.fabcoinapi.com/',
    },
    DOGE: {
        exchangily: 'https://dogeprod.fabcoinapi.com/',
    },
    LTC: {
        exchangily: 'https://ltcprod.fabcoinapi.com/',
    }    
  },
  chains: {
    BTC: {
        network: Btc.networks.bitcoin,
        satoshisPerBytes: 90,
        bytesPerInput: 152
    },
    DOGE: {
        network: {
            messagePrefix: '\u0019Dogecoin Signed Message:\n',
            bech32: 'tb',
            bip32: {
              public: 0x02facafd,
              private: 0x02fac398,
            },
            pubKeyHash: 0x1e,
            scriptHash: 0x16,
            wif: 0x9e,
        },            
        satoshisPerBytes: 1500000,
        bytesPerInput: 148
    },

    LTC: {
        network: {
            messagePrefix: '\u0019Litecoin Signed Message:\n',
            bech32: 'tb',
            bip32: {
              public: 0x019da462,
              private: 0x019d9cfe,
            },
            pubKeyHash: 0x30,
            scriptHash: 0x32,
            wif: 0xb0,
        },            
        satoshisPerBytes: 150,
        bytesPerInput: 148
    },  
    BCH: {
        network: {
            messagePrefix: '\u0018Bitcoin Signed Message:\n',
            bech32: 'tb',
            bip32: {
              public: 0x0488b21e,
              private: 0x0488ade4,
            },
            pubKeyHash: 28,
            scriptHash: 40,
            wif: 0x80,
        },            
        satoshisPerBytes: 9,
        bytesPerInput: 148
    },               
    ETH: {
        chain: 'mainnet',
        hardfork: 'petersburg',
        gasPrice: 90,
        gasPriceMax: 200,
        gasLimit: 21000,
        gasLimitToken: 70000
    },
    FAB: {
        network: Btc.networks.bitcoin,
        chain: {
            name: 'mainnet',
            networkId: 0,
            chainId: 0
        },
        satoshisPerBytes: 100,
        bytesPerInput: 152,
        gasPrice: 50,
        gasLimit: 800000
    },
    KANBAN: {
        chain: {
            name: 'mainnet',
            networkId: 211,
            chainId: 211
        },
        gasPrice: 50000000,
        gasLimit: 20000000
    }
  },  
  CoinType: {
    BTC: 0,
    ETH: 60,
    FAB: 1150,
    BCH: 145,
    LTC: 2,
    DOGE: 3
  }  
};
