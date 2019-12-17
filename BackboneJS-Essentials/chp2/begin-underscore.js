/*
 * window.setTImeout changes the 'this' context of its callback to the global window object
 */
const myCallback = function() {
    console.log(this);
}
window.setTimeout(myCallback); // Window {parent: Window}
/* jQuery event callbacks will change 'this' to the element that triggered the event 
 * jQuery AJAX callbacks will set it to the HTTP request created by the AJAX call
 */

 /*
  * using underscore bind 'this' to function
  */
 const simpleBook = {};
simpleBook.logThis = function() {
    console.log(this)
}

window.setTimeout(simpleBook.logThis); // Window {parent: Window}
simpleBook.logThis = _.bind(simpleBook.logThis, simpleBook);
window.setTimeout(simpleBook.logThis); //{logThis: f}  

/*
 * Using bindAll() to parmanently bind a method to an object 
 */
const Pencil = Backbone.Model.extend({
    initialize: function() {
        _.bindAll(this, 'logThis');
    },
    logThis: function() {
        console.log(this);
    }
});
const pen = new Pencil();
window.setTimeout(pen.logThis); // child {}
/*
 * bindAll() allows you to use your class's methods with setTimeout or as classback to jQuery event handlers or AJAX operations , without losing 'this'.
 * bindAll shoudl not be overuse becuase it creates a new copy of every method it binds.
 */

/*
 * using Underscore's each() function
 */
const animals = ['Dog', 'Cat', 'Lion', 'Fish'];
_.each(animals, function(animal, index) {
  console.log(index, animal);
});

/*
 * using Underscore's map() function
 */
const scores = [2, 7, 3, 5];
const scoresPlus10 = _.map(scores, function(score, index) {
  return score + 10;
});
console.log('Scores: ', scoresPlus10);

/*
 * using Userscores' reduce() function 
 */
const totalScore =  _.reduce(scores, function(total, score){
  return total + score;
}, 0);
console.log('Total Score: ', totalScore);

/*
 * using Undescore's extend() function
 */
const dev = {clientTool: 'JS, Bootstrap', serverLang: 'PHP', title: 'Web Developer'};
const engr = {serverLang: 'C#, JS, PHP', title: 'Full Stack Developer', db: 'Mongo'};
const combined = _.extend({}, dev, engr); 
console.log('Combined: ', combined); // {clientTool: "JS, Bootstrap", serverLang: "C#, JS, PHP", title: "Full Stack Developer", db: "Mongo"}

/*
 * Underscore's defaults() function only copies over values that the obect doesn't already have. 
 * 
 */
const preserve = _.defaults({}, dev, engr); 
console.log('Default: ', preserve) // {clientTool: "JS, Bootstrap", serverLang: "PHP", title: "Web Developer", db: "Mongo"}

/*
 * with Userscore's pluck method you can extract a single property value from each member of an array  
 */
const books = [
    {
        title: 'Backbone Essential',
        pages: 180,
        author: 'Jeremy Walker'
    },
    {
        title: 'Pro Angular6',
        pages: 780,
        author : 'Adam Freeman'
    },
    {
        title: 'Practical Node.js',
        pages: 519,
        author: 'Azat Marden'
    }
];
const authors = _.pluck(books, 'title');
console.log(authors); //  ["Backbone Essential", "Pro Angular6", "Practical Node.js"]

/*
 * Underscore's invoke method calls the specified method name on each element of the array passed as forst arguement  
 * _.invoke(list, methodName, [arguments]). a list of optional arguments can be passed as 3rd, 4th etc and forwarded to the method 
 */
const TechBook = function(book) {
    this.title = book.title;
    this.pages = book.pages;
    this.author = book.author;
};
TechBook.prototype.addLanguage = function (lang) {
  this.lang = lang;
  return this;
}
const techBooks = [
    new TechBook(books[0]),
    new TechBook(books[1]),
    new TechBook(books[2])
];

const techBooksWithLang = _.invoke(techBooks, 'addLanguage', 'JavaScript');
console.log(techBooks); // Each object in the array will now have a lang: "Javascript" property.
console.log(techBooksWithLang); // Same as techBooks because we returned this from the invoked function i.e addLanguage. 