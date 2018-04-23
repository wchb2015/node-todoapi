const request = require('request');

var getPriceInfo = (code) => {
    var url = `http://hq.sinajs.cn/list=${code}`;
    return new Promise((resolve, rejected) => {
        request({
            url: url,
            json: false
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve({
                    contractName: code,
                    openingPrice: body.split(',')[2],
                    closingPrice: body.split(',')[8],
                    theHighestPrice: body.split(',')[3],
                    theLowestPrice: body.split(',')[4],
                    averagePrice: body.split(',')[9],
                    openInterest: body.split(',')[13],
                    volume: body.split(',')[14]
                });
            } else {
                console.log('error ', error);
                rejected('Unable to fetch price info!');
            }
        })
    });
}

module.exports.getPriceInfo = getPriceInfo;


