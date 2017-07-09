import {priceActionTypes} from '../constants/actionTypes';
import {pending, rejected, fulfilled} from '../helpers/asyncStatusGenerator';
import _ from 'lodash';

export default function reducer(state = {
}, action) {
    const { BTCUSD, ETHUSD, LTCUSD, ALTCOINS } = priceActionTypes;
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
        case ALTCOINS:{
            const altcoinNames = _.map(action.payload.altcoins, i => _.pick(i, ['name', 'symbol']))
            return {
                ...state,
                altcoins : altcoinNames,
                altcoinData: action.payload
            };
        }
    }
    return state;
}