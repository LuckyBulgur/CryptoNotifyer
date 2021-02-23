export class config {
    getPriceInterval: number = 2000;
    loggerInterval: number = 5000;
    checkInterval: number = 1000;

    ethereumLower: Boolean = true;
    polkadotLower: Boolean = true;
    cardanoLower: Boolean = true;
    bitcoinLower: Boolean = true;

    btcpricealarm: number = 40000;
    ethpricealarm: number = 1250;
    dotpricealarm: number = 25;
    adapricealarm: number = 0.7;

    coins: [string, string, string, string] = [
        "Ethereum",
        "Bitcoin",
        "Polkadot",
        "Cardano"
    ];
}