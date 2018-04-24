const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 11
}

// var message = 'w';

// var hash = SHA256(message).toString();

// console.log(`Message : ${message}`);
// console.log(`Hash  : ${hash}`);

var token = jwt.sign(data, '123abc');

var decoded = jwt.verify(token + '1', '123abc');
console.log(token);
console.log(decoded);

