// https://pastebin.com/dMX7mZE0
// https://poloniex.com/support/api/
const autobahn = require('autobahn');
const wsuri = "wss://api.poloniex.com";
const connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});



module.exports = function() {
    connection.onopen = function(session) {
        function tickerEvent(args) {
            // if (args[0].indexOf('SIA')>=0){
                // console.log('//////')
                // console.log(args)
                // console.log('//////')
            // }


            switch (args[0]) {
                case 'USDT_ETH':
                    io.emit('USDT_ETH', args[1])
                    break;
                case 'USDT_BTC':
                    io.emit('USDT_BTC', args[1])
                    break;
                case 'USDT_LTC':
                    io.emit('USDT_LTC', args[1])
                    break;
                default:
                    break;
            }
        }
        session.subscribe('ticker', tickerEvent);
        // Appropriate labels for these data are, in order: currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
    }

    connection.onclose = function() {
        console.log("Websocket connection closed");
        io.emit('server_error', "Connection to Poloniex Was Lost.")
    }

    connection.open();
};