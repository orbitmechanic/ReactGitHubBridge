// Wrappers, bridges, and adapter functions for CoinGecko.com API

let API_URL='https://api.coingecko.com/api/v3/';

// ping ---------------------------------------

function ping(){
    // fire ping
    let cmd = API_URL + 'ping';
    return fireGet(cmd);;
};

// simple -------------------------------------

function price(ids, vs_currencies,
    include_market_cap = false, 
    include_24hr_vol = false,
    include_24hr_change = false,
    include_last_updated_at = false){
    // fire simple/price
    // note: converts true to 'true'.
    let cmd = API_URL + 'simple/price?'
            + 'ids=' + ids
            + '&vs_currencies=' + vs_currencies;
    if (include_market_cap){
        cmd += '&include_market_cap=true';
    }
    if (include_24hr_change){
        cmd += '&include_24hr_change=true';
    }
    if (include_last_updated_at){
        cmd += '&include_last_updated_at=true';
    }
    fetch(cmd)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log('Server error:' + err));
};

function token_price(platform, contract_addresses,vs_currencies,
    include_market_cap = false, 
    include_24hr_vol = false,
    include_24hr_change = false,
    include_last_updated_at = false){
    // fire simple/token_price/{id}
    // id: token platform id.
    // note: converts true to 'true'.
    let cmd = API_URL + 'simple/token_price?'
            + platform + '?'
            + 'contract_addresses=' + contract_addresses
            + '&vs_currencies=' + vs_currencies;
    if (include_market_cap){
        cmd += '&include_market_cap=true';
    }
    if (include_24hr_change){
        cmd += '&include_24hr_change=true';
    }
    if (include_last_updated_at){
        cmd += '&include_last_updated_at=true';
    }
    fetch(cmd)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log('Server error:' + err));
};

function supported_vs_currencies(){
    // Return list of supported denominations
    let cmd = API_URL + 'simple/supported_vs_currencies';
    fetch(cmd)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log('Server error:' + err));
};

// coins -------------------------------------

function coins_list(){
    // obtain all the coins id in order to make API calls
    let cmd = API_URL + 'coins/list';
    fetch(cmd)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log('Server error:' + err));
}

function coins_markets(vs_currency,price_change_percentage = '7d'){
    // obtain all the coins market data (price, market cap, volume)
    let cmd = API_URL + 'coins/markets'
        + '?vs_currency=' + vs_currency
        + '&order=market_cap_desc&order=market_cap_desc&per_page=250&page=1'
        + '&price_change_percentage=' + price_change_percentage;
    fetch(cmd)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('Server error:' + err));    
}

//...

function coins_history(coinname, date) {
    // recieve market data for a given coin on a given date.
    let cmd = API_URL + 'coins/history'
        + '?date=' + date
        + '&localization=false'
    fetch(cmd)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('Server error:' + err));  
} 

function calculateMarketVolData(){
    // Calculate total crypto market cap
    // Calculate percentage change in total market cap over 7 days.
    let cmd = API_URL + 'coins/history';
    let paramData{
        dates: [ undefined, undefined],
        cmd: [cmd, cmd],
        coins: ['btc','eth','usdt','xrp','bch','bsv','ada','ltc','bnb','link'], // top 10
        setDates: function(){
            this.dates[0] = dayzAgo(0);
            this.dates[1] = dayzAgo(7);
        },
        setCmds: function(){
            for(let i=0;i<length(this.dates);i++)
                cmd[i] += '?date=' + date + '&localization=false'
        } 
    } params.setDates().setCmds(); // class paramData
    let marketcap = [ 0, 0 ];
    let direction = 'sideways/7d.'
    let percent7d = 0;

    fetch(paramData.cmd[1])
        .then(response => response.json())
        .then(data[0] => { // promise 1
            fetch(paramData.cmd[1])
            .then(response => response.json())
            .then(data[1] => { // promise 2
                // should have data[0,1] avalable here:

                params.coins.foreach((coin){
                    for (let i=0; i< length(marketcap);i++){
                        marketcap[i] += data[i].market_cap.(coin->value); //syntax to work out
                    } // iterate markets
                }) // forEach coin

                percent7d = Math.abs(marketcap[0] - marketcap[1])/marketcap[0];
                if (marketcap[1] > marketcap[0]){
                    direction = 'up ' + percent7d.toFixed(2) + '%/7d';
                } elseif (marketcap[1] < marketcap[0]){
                    direction = 'down ' + percent7d.toFixed(2) + '%/7d';
                } // adjust direction statement if necessary.
                
                $("#tickerquote").html(
                    "Top 10 market cap total is " + marketcap[0]+ " usd "
                                        + direction);
            }) // promise 2
            .catch(err => console.log('Server error cmd2:' + err)); 
        }) // promise 1
        .catch(err => console.log('Server error cmd1:' + err));

}; // calculateMarketVolData()

// main.js....ish....

document.addEventListener('DOMContentLoaded', (event) => {
    //Document has loaded.
    CalculateMarketVolData();
})