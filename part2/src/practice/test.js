

var fs = require('fs');


/* Higher Order Functions */
const animals = [
  { name: 'Leo', specie: 'Lion' },
  { name: 'Dumbo', specie: 'Elephant' },
  { name: 'Buddy', specie: 'Dog' },
  { name: 'Lucy', specie: 'Dog' },
  { name: 'Gigi', specie: 'Giraffe' },
  { name: 'Tiggy', specie: 'Tiger' }
];

//var isDog = function(animal){return animal.specie == 'Dog'};
//var isDog = (animal) => {return animal.specie == 'Dog'};
var isDog = animal => animal.specie == 'Dog';
var dogs = animals.filter(isDog);

//console.log(dogs);

// var mapExample = animals.map(function(animal){
//   return animal.name + ' is a ' + animal.specie;
// })
var formSentence = (animal)=> animal.name + ' is a ' + animal.specie;
var mapExample = animals.map(formSentence);

//console.log(mapExample);

var orders = [
  {amount: 250},
  {amount: 400},
  {amount: 100},
  {amount: 325},
];

var sumAmountOrders = (sum, order) => sum + order.amount;

var reduceExample = orders.reduce(sumAmountOrders, 0);
/*
var reduceExample = orders.reduce(function(sum, order){
  return sum + order.amount;
}, 0);
*/
//console.log(reduceExample);


var output = fs.readFileSync('data.txt', 'utf-8')
.trim()
.split('\n')
.map(line=>line.split(' '))
console.log(output);


