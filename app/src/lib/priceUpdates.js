import io from '../config/socketio';
import {bitcoinUSDPrice, etherUSDPrice, litecoinUSDPrice, altcoinUSDPrices} from '../store/actions/priceActions';

module.exports = function(dispatch) {
    //PoloniexApi
    io.on('USDT_ETH', function(data){
        dispatch(etherUSDPrice(data))
    })
    io.on('USDT_BTC', function(data){
        dispatch(bitcoinUSDPrice(data))
    })
    io.on('USDT_LTC', function(data){
        dispatch(litecoinUSDPrice(data))
    })

    //CoinMarketCap - Interval calls
    io.on('altcoins', function(data){
        dispatch(altcoinUSDPrices(data))
    })
}