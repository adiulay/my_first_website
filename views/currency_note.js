const _ = require('lodash');
const axios = require('axios');

var getCountry = async (country) => {
    try {
        var country_data = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
        return country_data.data[0].currencies[0].code
    } catch (error) {
        return (`<Error: Country does not exist>`)
    }
};

var getFirstCoin = async (country_code) => {
    try {
        var cryptonator = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${_.lowerCase(country_code)}&ids=bitcoin`);
        return _.round(cryptonator.data[0].current_price, 2)
    } catch (e) {
        return (NaN)
    }
};

var getSecondCoin = async (country_code) => {
    try {
        var cryptocompare = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=${country_code}`);
        return cryptocompare.data.BTC[`${country_code}`]
    } catch (error) {
        return (NaN)
    }
};


module.exports = {
    country: getCountry,
    firstcoin: getFirstCoin,
    secondcoin: getSecondCoin
};