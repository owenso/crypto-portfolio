// https://pastebin.com/dMX7mZE0
// https://poloniex.com/support/api/
var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});



module.exports = function() {
    connection.onopen = function(session) {
        function tickerEvent(args) {
            // console.log('//////')
            // console.log(args)
            // console.log('//////')
            if (args[0] === "USDT_ETH") {
                console.log(args)
            }
        }
        session.subscribe('ticker', tickerEvent);
        // Appropriate labels for these data are, in order: currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
    }

    connection.onclose = function() {
        console.log("Websocket connection closed");
    }

    connection.open();
};