import {priceActionTypes} from '../constants/actionTypes';
import {pending, rejected, fulfilled} from '../helpers/asyncActionGenerator';

export function bitcoinUSDPrice(price) {
    const {BTCUSD} = priceActionTypes;
	return {
		type: BTCUSD,
		payload: {
            price,
            timestamp: Date.now()
        }
	}
}

export function etherUSDPrice(price) {
    const {ETHUSD} = priceActionTypes;
	return {
		type: ETHUSD,
		payload: {
            price,
            timestamp: Date.now()
        }
	}
}

export function litecoinUSDPrice(price) {
    const {LTCUSD} = priceActionTypes;
	return {
		type: LTCUSD,
		payload: {
            price,
            timestamp: Date.now()
        }
	}
}