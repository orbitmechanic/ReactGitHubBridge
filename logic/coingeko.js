// API Assignment
// Fetch ETH price 

let BASE_URL="https://api.coingecko.com/api/v3";
let BITCOIN_PRICE_ENDPOINT = "/simple/price?ids=bitcoin&vs_currencies=usd";
let bitcoinPriceUrl = BASE_URL + BITCOIN_PRICE_ENDPOINT;

fetch(bitcoinPriceUrl)
.then(function(res){
    res.json().then(function(data){
        console.log(data.bitcoin.usd);
        $(".btcprice").html("Bitcoin price is " + data.bitcoin.usd);
    })
})