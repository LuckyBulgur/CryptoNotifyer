import { getprices } from './getprices';
import { pushNotify } from "./pushNotify";
import { config as con } from './config'
const pushNotifyer = new pushNotify();
const prices = new getprices();
const config = new con();

export class check {
    private ethereumLowerCheck = config.ethereumLower;
    private bitcoinLowerCheck = config.bitcoinLower;
    private polkadotLowerCheck = config.polkadotLower;
    private cardanoLowerCheck = config.cardanoLower;
    public btcpricealarm = config.btcpricealarm;
    public ethpricealarm = config.ethpricealarm;
    public dotpricealarm = config.dotpricealarm;
    public adapricealarm = config.adapricealarm;
    private coins = config.coins;
    private ethnotifyer = true;
    private btcNotifyer = true;
    private dotNotifyer = true;
    private adaNotifyer = true;

    constructor() {
        setInterval(() => {
            for (let value of this.coins) {
                let checkerValue = this.getCheckValue(value);
                if (checkerValue) {
                    this.checkcoinLower(value);
                } else {
                    this.checkcoinHigher(value);
                }
            }
        }, config.checkInterval);
    }

    public async getCheckValue(coin: string) {
        switch (coin) {
            case "Bitcoin":
                if (this.bitcoinLowerCheck == false) {
                    return false;
                } else if (this.bitcoinLowerCheck == true) {
                    return true;
                }
                break;
            case "Ethereum":
                if (this.ethereumLowerCheck == false) {
                    return false;
                } else if (this.ethereumLowerCheck == true) {
                    return true;
                }
                break;
            case "Polkadot":
                if (this.polkadotLowerCheck == false) {
                    return false;
                } else if (this.polkadotLowerCheck == true) {
                    return true;
                }
                break;
            case "Cardano":
                if (this.cardanoLowerCheck == false) {
                    return false;
                } else if (this.cardanoLowerCheck == true) {
                    return true;
                }
                break;
        }
    }

    public async send(coin: string) {
        switch (coin) {
            case "Bitcoin":
                setTimeout(async () => {
                    await pushNotifyer.push(coin, prices.bitcoinPrice, prices.bitcoinPriceChange);
                }, 200);
                break;
            case "Ethereum":
                setTimeout(async () => {
                    await pushNotifyer.push(coin, prices.ethereumPrice, prices.ethereumPriceChange);
                }, 200);
                break;
            case "Polkadot":
                setTimeout(async () => {
                    await pushNotifyer.push(coin, prices.polkadotPrice, prices.polkadotPriceChange);
                }, 200);
                break;
            case "Cardano":
                setTimeout(async () => {
                    await pushNotifyer.push(coin, prices.cardanoPrice, prices.cardanoPriceChange);
                }, 200);
                break;
        }
    }

    public async checkcoinLower(coin: string) {
        switch (coin) {
            case "Bitcoin":
                if (prices.bitcoinPrice <= this.btcpricealarm && this.btcNotifyer == true) {
                    await this.send("Bitcoin");
                    this.btcNotifyer = false;
                } else if (this.btcpricealarm < prices.bitcoinPrice && this.btcNotifyer == false) {
                    this.btcNotifyer = true;
                }
                break;
            case "Ethereum":
                if (prices.ethereumPrice <= this.ethpricealarm && this.ethnotifyer == true) {
                    await this.send("Ethereum");
                    this.ethnotifyer = false;
                } else if (this.ethpricealarm < prices.ethereumPrice && this.ethnotifyer == false) {
                    this.ethnotifyer = true;
                }
                break;
            case "Polkadot":
                if (prices.polkadotPrice <= this.dotpricealarm && this.dotNotifyer == true) {
                    await this.send("Polkadot");
                    this.dotNotifyer = false;
                } else if (this.dotpricealarm < prices.polkadotPrice && this.dotNotifyer == false) {
                    this.dotNotifyer = true;
                }
                break;
            case "Cardano":
                if (prices.cardanoPrice <= this.adapricealarm && this.adaNotifyer == true) {
                    await this.send("Cardano");
                    this.adaNotifyer = false;
                } else if (this.adapricealarm < prices.cardanoPrice && this.adaNotifyer == false) {
                    this.adaNotifyer = true;
                }
                break;
        }
    }

    public async checkcoinHigher(coin: string) {
        switch (coin) {
            case "Bitcoin":
                if (prices.bitcoinPrice >= this.btcpricealarm && this.btcNotifyer == true) {
                    await this.send("Bitcoin");
                    this.btcNotifyer = false;
                } else if (this.btcpricealarm > prices.bitcoinPrice && this.btcNotifyer == false) {
                    this.btcNotifyer = true;
                }
                break;
            case "Ethereum":
                if (prices.ethereumPrice >= this.ethpricealarm && this.ethnotifyer == true) {
                    await this.send("Ethereum");
                    this.ethnotifyer = false;
                } else if (this.ethpricealarm > prices.ethereumPrice && this.ethnotifyer == false) {
                    this.ethnotifyer = true;
                }
                break;
            case "Polkadot":
                if (prices.polkadotPrice >= this.dotpricealarm && this.dotNotifyer == true) {
                    await this.send("Polkadot");
                    this.dotNotifyer = false;
                } else if (this.dotpricealarm > prices.polkadotPrice && this.dotNotifyer == false) {
                    this.dotNotifyer = true;
                }
                break;
            case "Cardano":
                if (prices.cardanoPrice >= this.adapricealarm && this.adaNotifyer == true) {
                    await this.send("Cardano");
                    this.adaNotifyer = false;
                } else if (this.adapricealarm > prices.cardanoPrice && this.adaNotifyer == false) {
                    this.adaNotifyer = true;
                }
                break;
        }
    }

    public logger() {
        setInterval(() => {
            console.log(this.coins);
            console.log([`${prices.ethereumPrice}€`, `${prices.bitcoinPrice}€`, `${prices.polkadotPrice}€`, `${prices.cardanoPrice}€`]);
            console.log([((parseFloat(prices.ethereumPriceChange) < 0) ? `${prices.ethereumPriceChange}€` : `+${prices.ethereumPriceChange}€`), ((parseFloat(prices.bitcoinPriceChange) < 0) ? `${prices.bitcoinPriceChange}€` : `+${prices.bitcoinPriceChange}€`), ((parseFloat(prices.polkadotPriceChange) < 0) ? `${prices.polkadotPriceChange}€` : `+${prices.polkadotPriceChange}€`), ((parseFloat(prices.cardanoPriceChange) < 0) ? `${prices.cardanoPriceChange}€` : `+${prices.cardanoPriceChange}€`)])
            console.log("\n");
        }, config.loggerInterval);
    }
}