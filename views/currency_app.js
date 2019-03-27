const crypto = require('./currency_note.js');
const _ = require('lodash');


//This function gets a bit confusing, but essentially firstcoin and secondcoin compares values, takes the lowest if true
var getInput = async () => {
    var user_input = document.getElementById("country_input").value;
    const retrieve_country = await crypto.country(user_input);
    const retrieve_firstcoin = await crypto.firstcoin(`${retrieve_country}`);
    const retrieve_secondcoin = await crypto.secondcoin(`${retrieve_country}`);

    // console.log(retrieve_country)
    var test1 = _.gt(_.round(retrieve_secondcoin, 2), _.round(retrieve_firstcoin, 2));

    try {
        if (test1 === true) {
            if (retrieve_country === `<Error: Country does not exist>`){
                throw new Error(`Cannot retrieve`)
            } else {
                if (_.isNaN(_.round(retrieve_firstcoin, 2) === true)) {
                    document.getElementById("output").innerHTML = `Country code: ${retrieve_country}`;
                    document.getElementById("output1").innerHTML = `Lowest Rate is cryptocompare: 1 BTC = $${_.round(retrieve_secondcoin, 2)} ${retrieve_country}`;
                } else {
                    console.log(`Country code: ${retrieve_country}`);
                    console.log(`Lowest Rate is cryptonator: 1 BTC = $${_.round(retrieve_firstcoin, 2)} ${retrieve_country}`);
                }
            }
        } else {
            if (retrieve_country === `<Error: Country does not exist>`){
                throw new Error(`Cannot retrieve`)
            } else {
                if (_.isNaN(_.round(retrieve_secondcoin, 2) === true)) {
                    console.log(`Country code: ${retrieve_country}`);
                    console.log(`Lowest Rate is cryptonator: 1 BTC = $${_.round(retrieve_firstcoin, 2)} ${retrieve_country}`);
                } else {
                    console.log(`Country code: ${retrieve_country}`);
                    console.log(`Lowest Rate is cryptocompare: 1 BTC = $${_.round(retrieve_secondcoin, 2)} ${retrieve_country}`);
                }

            }
        }
    } catch (e) {
        console.log('Error: Country does not exist');
    }

    if (_.isNaN(_.round(retrieve_secondcoin, 2)) === true) {
        // console.log('Error: Cryptocompare does not have it.')
        // console.log(``)
    } else {
        console.log(`From cryptocompare: 1 BTC = $${_.round(retrieve_secondcoin, 2)} ${retrieve_country}`);
    }

    if (_.isNaN(_.round(retrieve_firstcoin, 2)) === true) {
        // console.log('Error: Cryptonator does not have it.')
        // console.log('')
    } else {
        console.log(`From cryptonator: 1 BTC = $${_.round(retrieve_firstcoin, 2)} ${retrieve_country}`);
    }
};

getInput();