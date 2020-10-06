// Calculate total market cap and 7d%

let API_URL='https://api.coingecko.com/api/v3/';
let API_FUNCT = API_URL + 'coins/history';

function makeHistoryUrl(dayz) {
    let date = dayzAgo(dayz);
    return API_FUNC + '?date=' + date + '&localization=false'
};

async function calculateMarketVolData() {
    let url1 = makeHistoryUrl(dayzAgo(0))
    let url2 = makeHistoryUrl(dayzAgo(7))
    // ... other variables

    try {
        const response1 = await fetch(url1)
        const json1 = await response1.json()
        // ...do stuff with result 1
        console.log(json1);
    
        const response2 = await fetch(url2)
        const json2 = await response2.json()

        // ...do stuff with result 1 and 2
        const marketCapData = createMarketCapData(result1, result2);
        console.log(json2);

        return marketCapData
    } catch(error) {
        console.log('Caught API error:' + error);
    }
};

async function updateMarketCap(){
    const marketCapData = await calculateMarketVolData();
    // Do jQuery Magic 
    $("#tickerquote").html(
        "Top 10 market cap total is " + marketCapData[0]+ " usd "
                            + marketCapData[1]);
}