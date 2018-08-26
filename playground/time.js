//new Date().getTime(); // cas v mili sekundach

const moment = require('moment');



// let date = new Date();
// console.log(date.getMonth());

//MMM - mesiace
//momentjs.com - display

let createdAt = 1234;
let date = moment(createdAt);

console.log(date.format('h:mm a'));