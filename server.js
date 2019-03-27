const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const _ = require('lodash');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
// app.use('views', __dirname + '/public'); //derek/joey found this
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));

hbs.registerHelper('getCurrentYear', () => { //variable, function
    return new Date().getFullYear();
});

// hbs.registerHelper('message', (text) => {
//     return text.toUpperCase();
// });

hbs.registerHelper('name', (name) => {
    return name
});

hbs.registerHelper('css', () => {
    return 'stylesheet.css'
});

// app.use((request, response, next) => {
//     var time = new Date().toString();
//     console.log(`${time}: ${request.method} ${request.url}`);
//     next();
// });

// app.use((request, response, next) => {
//     var time = new Date().toString();
//     // console.log(`${time}: ${request.method} ${request.url}`);
//     var log = `${time}: ${request.method} ${request.url}`;
//     fs.appendFile('server.log', log + '\n', (error) => {
//         if (error) {
//             console.log('Unable to log message');
//         }
//     });
//     next();
// });

app.get('/', (request, response) => {
    response.render('index.hbs', {
        year: new Date().getFullYear(),
        header: 'Main Page',
        company_name: 'JETAR GROUP'
    })
});

//READ THIS, IF YOU UNCOMMENT THIS PAGE, IT WILL LEAD YOU TO THE SITE DOWN
// app.use((request, response) => {
//     response.render('down_site.hbs', {
//         title: 'Error Page',
//         year: new Date().getFullYear(),
//         header: 'The site is currently down for maintenance'
//     });
// });

// app.get('/', (request, response) => {
//     response.send({
//         name: 'Your Name',
//         school: [
//             'BCIT',
//             'SFU',
//             'UBC'
//         ]
//     })
// });

// app.get('/info', (request, response) => {
//     response.send('My info page');
// });

// app.get('/info', (request, response) => {
//     response.render('about.hbs');
// });

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About Jimmy',
        year: new Date().getFullYear(),
        welcome: 'Hello!',
        header: 'About Page!'
    });
});

app.get('/currency', async (request, response) => {
    try {

        var country_canada = await axios.get(`https://restcountries.eu/rest/v2/name/Canada?fullText=true`);
        var coded_canada = country_canada.data[0].currencies[0].code;

        var conversion_rate = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=` + encodeURIComponent(coded_canada) + `&base=USD`);
        var rate = conversion_rate.data.rates[`${coded_canada}`];

        response.render('currency.hbs', {
            title: "Currency Page",
            header: "Currency Conversion",
            welcome: 'Woohoo',
            output: `1 USD = ${_.round(rate, 2)} ${coded_canada}`
        });

    } catch (e) {

        if (coded_canada === undefined) {
            response.render('currency.hbs', {
                title: "Currency Page",
                header:"Error Page",
                welcome: "Awww",
                output: 'Country does not exist'
            });
        } else if (rate === undefined) {
            response.render('currency.hbs', {
                title: "Currency Page",
                header: "Error Page",
                welcome: "Awww",
                output: 'Rate does not exist'
            });
        } else {
            response.send(
                {
                    error: `${e}`
                }
            )
        }


    }
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});