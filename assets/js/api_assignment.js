// API Assignment
// Fetch ETH price 

function dd_mm_yyyy(dd, mm, yyyy){
    let dateStr = "date=" + dd + '-' + mm + '-' + yyyy
    return dateStr;
};

function getDate(dazAgo){
    let today = new Date();
    let ago = new Date(today.setDate(today.getDate() - dazAgo));
    let dd = String(ago.getDate()).padStart(2, '0');
    let mm = String(ago.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = ago.getFullYear();
    return (dd_mm_yyyy(dd, mm, yyyy));
};

function previewPrice(){    
    fetch(ethereumPriceUrl)
    .then(function(res){
        res.json().then(function(data){
        console.log(data);
        let todaysPrice = data.market_data.current_price.btc;
        fetch(ethereumPriceUrlOld)
        .then(function(res){
            res.json().then(function(data){
                console.log(data);
                let lastWeeksPrice = data.market_data.current_price.btc;
                let delta = todaysPrice - lastWeeksPrice;
                if (delta < 0) {
                    direction = ' down ';
                    color = 'red';
                } else {
                    if (delta > 0){
                        direction = ' up ';
                        color = 'green';
                    } else {
                        direction = 'sideways';
                        color = 'yellow';
                    }
                }
                let percentage = delta/todaysPrice;
                $("#tickerquote").html("Ethereum price is " + todaysPrice.toFixed(5) + " BTC"
                                        + direction + percentage.toFixed(2) + '%/week')
                                 .css('color',color);
            })
        })
    })
    })
};

let BASE_URL="https://api.coingecko.com/api/v3";
let ETHEREUM_PRICE_HISTORY_ENDPOINT = "/coins/ethereum/history?";
let TODAY_ENTRY = getDate(0);
let LASTWEEK_ENTRY = getDate (7);
let SUFFIX = '&localization=false" -H "accept: application/json"';
let ethereumPriceUrl = BASE_URL + ETHEREUM_PRICE_HISTORY_ENDPOINT + TODAY_ENTRY + SUFFIX;
let ethereumPriceUrlOld = BASE_URL + ETHEREUM_PRICE_HISTORY_ENDPOINT + LASTWEEK_ENTRY + SUFFIX;
let direction = ' up ';

document.addEventListener('DOMContentLoaded', (event) => {
    //Document has loaded.
    previewPrice();
})