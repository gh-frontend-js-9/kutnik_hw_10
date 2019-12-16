const axios = require ('axios');



const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await  axios.get('http://www.apilayer.net/api/live?access_key=06819edc4f9a43b5a1e8a7109276c9e6');
        const rate = response.data.quotes;
        const euro = 1 / rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];

        return exchangeRate;
    };

const getCountries = async (toCurrency) => {
    const response = await axios.get('https://restcountries.eu/rest/v2/currency/${currencyCode}');
    return response.data.map( country => country.name);
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spent these in the following countries ${countries}`;

};