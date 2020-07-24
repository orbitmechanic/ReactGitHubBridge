// Let's go data whaling....

const API_URL      = 'https://api.coingecko.com/api/v3/';
const API_CMD      = 'coins/markets';
const DENOMINATION = 'usd'
const API_QUERY    = '?vs_currency=usd';
const API_PARAMS   = ['&order=market_cap_desc',
                    '&per_page=100', 
                    '&page=1',
                    '&sparkline=false',
                    '&price_change_percentage=24h'];
const url = [API_URL, API_CMD, API_QUERY, API_PARAMS.toString].toString;

class Coin{ // (Structural: Adapter from JSON to BootStrap table row)
    constructor(dataObj){
        this.rank       = dataObj.market_cap_rank;
        this.name       = dataObj.id;
        this.marketCap  = dataObj.market_cap;
        this.price      = dataObj.current_price;
        this.volume24h  = dataObj.total_volume;
        this.circulatingSupply = dataObj.circulating_supply;
        this.change24h  = dataObj.price_change_percentage_24h;
    } // default constructor
    toString(){
        // convert to an html/bootstrap <tr>
        let htmlstr = '';
            htmlstr += '<tr>\n';
            htmlstr += '    <td>' + this.rank + '</td>\n';
            htmlstr += '    <td>' + this.name + '</td>\n';
            htmlstr += '    <td>' + this.marketCap + ' ' + DENOMINATION +'</td>\n';
            htmlstr += '    <td>' + this.price +  ' ' + DENOMINATION + '</td>\n';
            htmlstr += '    <td>' + this.volume24h + '</td>\n';
            htmlstr += '    <td>' + this.circulatingSupply + '</td>\n';
            if (this.change24h > 0){
                dirTag = 'upperclass';
            } else if (this.change24h < 0) {
                dirTag = 'lowerclass';
            } else {
                dirTag = 'sidewaysclass';
            }
            htmlstr += "    <td class='" + dirTag + "'>" + this.change24h + '%</td>\n';
            htmlstr += '    <td>' + 'Purdy Picture' + '</td>\n';
            htmlstr += '</tr>\n';
        return htmlstr;
    } // totr()
} // class Coin

let Coins = []; // the back-end (flat) database

async function importMarketData() {
    // import data
    try {
        const response = await fetch(url);
        const coins = await response1.json();
        coins.foreach(function(coin){
            Coins.push(new Coin(coin));
        }) // coins.foreach
    } catch(error) {
        console.log('oops. ' + error);
    }; // try-catch
    $('.tabletag').html(Coins.toString());
}; // importMarketData()

