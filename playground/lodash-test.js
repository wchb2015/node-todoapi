const _ = require('lodash');

var req = {
    text: "hehe",
    completed: false,
    completedAt: 1
}

req.user = "zhangsan";

console.log(req);
console.log(JSON.stringify(req, undefined, 2));
console.log(_.isBoolean(req.completed));
console.log(new Date().getTime());


req.aa = {
    f1: "zhangsan",
    f2: "lisi"
}

var body = _.pick(req, ['text', 'aa']);
console.log(body);