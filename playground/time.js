var moment = require('moment');
//
// var date = new Date();
//
// console.log(date.getMonth());

var createdAt = 232342342342;
var date = moment(createdAt);

console.log(date.format('h:mm a'));
