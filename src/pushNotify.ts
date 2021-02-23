import notifier from "node-notifier"
import path from "path"

export class pushNotify {
    public async push(coin: string, price: string, priceChange: number) {
        notifier.notify(
            {
                title: 'Price Alarm',
                appID: "CryptoNotifier",
                icon: path.join(__dirname, `../images/${coin}.png`),
                message: `${coin} is currently at ${parseFloat(price).toFixed(2)}€ and has changed by ${(priceChange < 1 && priceChange > -1) ? priceChange : parseInt(priceChange.toString())}€`,
                wait: false
            }
        );
    }
}