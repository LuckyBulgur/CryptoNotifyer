import axios from "axios";
import { config } from './config'

export class getprices {
    public pairs = "ETHEUR,BTCEUR,DOTEUR,ADAEUR";
    public ethereumPriceChange: any = 10000;
    public bitcoinPriceChange: any = 10000;
    public polkadotPriceChange: any = 10000;
    public cardanoPriceChange: any = 10000;
    public ethereumPrice: any = 100000;
    public bitcoinPrice: any = 100000;
    public polkadotPrice: any = 100000;
    public cardanoPrice: any = 100000;

    constructor() {
        this.getPriceChanges();
        this.getPrices();
        setInterval(async () => {
            await this.getPriceChanges();
            await this.getPrices();
        }, new config().getPriceInterval);
    }

    public async getPrices() {
        await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${this.pairs}`).then((response) => ((this.ethereumPrice = parseFloat(response.data.result.XETHZEUR.c[0]).toFixed(3)), (this.bitcoinPrice = parseFloat(response.data.result.XXBTZEUR.c[0]).toFixed(3)), (this.polkadotPrice = parseFloat(response.data.result.DOTEUR.c[0]).toFixed(3)), (this.cardanoPrice = parseFloat(response.data.result.ADAEUR.c[0]).toFixed(3)))).catch(error => console.log(error));
    }

    public async getPriceChanges() {
        await axios.get("https://api.binance.com/api/v1/ticker/24hr?symbol=ETHEUR").then((response) => ((this.ethereumPriceChange = parseFloat(response.data.priceChange)))).catch(error => console.log(error));
        await axios.get("https://api.binance.com/api/v1/ticker/24hr?symbol=BTCEUR").then((response) => ((this.bitcoinPriceChange = parseFloat(response.data.priceChange)))).catch(error => console.log(error));
        await axios.get("https://api.binance.com/api/v1/ticker/24hr?symbol=DOTEUR").then((response) => ((this.polkadotPriceChange = parseFloat(response.data.priceChange)))).catch(error => console.log(error));
        await axios.get("https://api.binance.com/api/v1/ticker/24hr?symbol=ADAEUR").then((response) => ((this.cardanoPriceChange = parseFloat(response.data.priceChange)))).catch(error => console.log(error));
    }
}