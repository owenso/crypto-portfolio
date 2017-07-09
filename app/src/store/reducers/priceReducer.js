import {priceActionTypes} from '../constants/actionTypes';
import {pending, rejected, fulfilled} from '../helpers/asyncStatusGenerator';

export default function reducer(state = {
}, action) {
    const { BTCUSD, ETHUSD, LTCUSD } = priceActionTypes;
    switch (action.type){
        case BTCUSD:
            return {
                ...state,
                bitcoinUSD: action.payload
            };
        case ETHUSD:
            return {
                ...state,
                ethereumUSD: action.payload
            };
        case LTCUSD:
            return {
                ...state,
                litecoinUSD: action.payload
            };
    }
    return state;
}