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

function url() {
    // assemble the URL
    console.log('assmbling url:')
    const gogetem = [API_URL, API_CMD, API_QUERY, 
        API_PARAMS.join('').toString()].join('').toString();
    console.log(gogetem);
    return gogetem;
};

class Coin{ // adapter
    constructor(dataObj){
        // console.log('Minting coin data:' + dataObj.name);
        this.id                                     = dataObj.id;
        this.symbol                                 = dataObj.symbol;
        this.name                                   = dataObj.name;
        this.image                                  = dataObj.image;
        this.current_price                          = dataObj.current_price;
        this.market_cap                             = dataObj.market_cap;
        this.market_cap_rank                        = dataObj.market_cap_rank;
        this.total_volume                           = dataObj.total_volume;
        this.high_24h                               = dataObj.high_24h;
        this.low_24h                                = dataObj.low_24h;
        this.price_change_24h                       = dataObj.price_change_24h; 
        this.price_change_percentage_24h            = dataObj.price_change_percentage_24h;
        this.market_cap_change_24h                  = dataObj.market_cap_change_24h;
        this.market_cap_change_percentage_24h       = dataObj.market_cap_change_percentage_24h;
        this.circulating_supply                     = dataObj.circulating_supply;
        this.total_supply                           = dataObj.total_supply;
        this.ath                                    = dataObj.ath;
        this.ath_change_percentage                  = dataObj.ath_change_percentage;
        this.ath_date                               = dataObj.ath_date;
        this.atl                                    = dataObj.atl;
        this.atl_change_percentage                  = dataObj.atl_change_percentage; 
        this.atl_date                               = dataObj.atl_date;
        this.roi                                    = dataObj.roi;
        this.last_updated                           = dataObj.last_updated;
        this.price_change_percentage_7d_in_currency = dataObj.price_change_percentage_7d_in_currency;
    } // default constructor
    toString(){
        // convert to an html/bootstrap <tr>
        // console.log('Creating table row for: ' + this.name);
        let dirTag = 'sidewaysclass';
        let htmlstr = '';
            htmlstr += '<tr>\n';
            htmlstr += '    <td>' + this.market_cap_rank + '</td>\n';
            htmlstr += '    <td class="text-left"><img src="' + this.image + '" class="coinicon">   ' + this.name + '</td>\n';
            htmlstr += '    <td>' + this.market_cap.toLocaleString() + '</td>\n';
            htmlstr += '    <td>' + this.current_price.toPrecision(3) + '</td>\n';
            htmlstr += '    <td>' + this.total_volume.toLocaleString() + '</td>\n';
            htmlstr += '    <td>' + this.circulating_supply.toLocaleString() + '</td>\n';
            if (this.price_change_percentage_24h > 0){
                dirTag = 'upperclass';
            } else if (this.price_change_percentage_24h < 0) {
                dirTag = 'lowerclass';
            }; // label direction
            htmlstr += "    <td class='" + dirTag + "'>" + this.price_change_percentage_24h.toPrecision(3) + '%</td>\n';
            htmlstr += '    <td>' + '[Purdy Picture]' + '</td>\n';
            htmlstr += '</tr>\n';
        return htmlstr;
    } // totr()
} // class Coin

let coinsDB = [];  // singleton front-end database

async function importMarketData() {
    // import data
    console.log('Loading table data...');
    try {
        const response = await fetch(url());
        let coins = await response.json();
        while(coins.length > 0) {
            coinsDB.push(new Coin(coins.pop()));
        }; // cast array to Coin class.
        coinsDB = coinsDB.reverse(); // Undo FILO
    } catch(error) {
        console.log('importMarketData() failure: ' + error);
    }; // try-catch
}; // importMarketData()

async function displayMarketData(){
    // Push market data to table
    console.log('Displaying table data.');
    try {
        await importMarketData();
        $('.tabletag').html(coinsDB.toString());
    } catch {
        console.log('displayMarketData() failure: ' + error);
    }
}; // displayMarketData()

async function sortby(field){
    // Sort coinsDB by given field
    console.log('Sorting list by: ' + field);
    try {
        coinsDB = sort(function(a,b){
            return a[field] - b[field];
        }); // compare function, sort()
        await displayMarketData();
    } catch {
        console.log('sortby() failure: ' + error); 
    } // try-catch
}; // sortby()

window.onload = displayMarketData();