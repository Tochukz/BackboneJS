/*
 * Defining backbone Model's default attribute
 */
const Book = Backbone.Model.extend({
  defaults: {
    title: 'Backbone Essential'
  }
});
const book = new Book();
const titleAttribute = book.attributes.title;
console.log('Title: ', titleAttribute); // Backbone Essential

/*
 * If a default attribute is an object then it is shared between different objects of the Model class
 * This is because JavaScript objects are pased by reference.
 */
const Person = Backbone.Model.extend({
 defaults: {
   user: {
     name: 'Tochukwu'
   }
 }
});
const person1 = new Person();
const person2 = new Person();

console.log(person1.attributes.user.name); // Tochukwu
console.log(person2.attributes.user.name); // Tochukwu
// You should never set an attribute directly like this though
person1.attributes.user.name = 'Chucks';
console.log(person2.attributes.user.name); // Chucks

/*
 * Adding properties direct to Model when it is initialized
 * Each instance will have its own set of initialized properties.
 */
const User = Backbone.Model.extend({
  initialize: function(user) {
    this.username = user.username;
    this.email = user.email;
  }
});

const users = [
  {
    username: 'Julichichi',
    email: 'Julichichi@hotmail.com'
  },
  {
    username: 'Starboy',
    email: 'starboy202@yahoo.com'
  }
]
const user1 = new User(users[0]);
const user2 = new User(users[1]);

console.log('User 1: ', user1.username); // Julichichi
console.log('User 2: ', user2.email); // starboy202@yahoo.com
console.log('User1 Attributes', user1.attributes); // {username: "Julichichi", email: "Julichichi@hotmail.com"}

/*
 * Setting Model attribute  using the set() method
 */
user1.set('city', 'Lagos');
console.log('User1 City: ', user1.city); // undefined
console.log('user1 City', user1.attributes.city); //Lagos

/* Using the overloaded set method to set attribute */
user2.set({city: 'Lagos', car: 'Honder'});
console.log('User2 Car:', user2.car); // undefined
console.log('User2 Car:', user2.attributes.car); // Honder


/*
 * Unsetting Model attribute using the unset() method
 * The unset() method lets any code listening to the Model know about the change
 */
console.log('User2 City: ', user2.attributes.city); // Lagos
/* use the unset method, don't use JavaScript delete operation i.e delete user2.attributes.city */
user2.unset('city');
console.log('User2 City: ', user2.attributes.city); // undefined

/*
 * Use the Model get() method to retreive attribute. Don't do it directly like users2.attributes.car
 */
const user2Car = user2.get('car');
console.log('User2 Car: ', user2Car); // Honder

/*
 * Listening for Model events using on() method
 */
const dev = new  Backbone.Model({
  name: 'Tochukwu',
  city: 'Joburg'
});
console.log('Dev Name: ', dev.get('name')); // Tochukwu;
console.log('Dev City', dev.get('city')); // Joburg
/* Do not access attributes like this. Use the get() method instead */
// console.log('Dev name',  dev.attributes.name); // Tochukwu

/* adding event listener for the city property */
dev.on('change:city', function() {
  console.log(`dev.city changed to: ${dev.get('city')}`);
});
dev.set('city', 'Cape Town'); //dev.city changed to: Cape Town
dev.set('city', 'Boston'); //dev.city changed to: Boston
/* removing event listening for the city property */
dev.off('change:city');
dev.set('city', 'Tokyo');

/*
 * Listening to multiple events on a Model by seperating the events with spaces
 */
const laptop = new Backbone.Model({
  name: 'HP'
});
laptop.on('change destroy', function(model) {
console.log("Model: ", model);
 if (model.attributes.name !== model._previousAttributes.name && model._previousAttributes.name !== undefined) {
    console.log(`Name changed: ${model._previousAttributes.name} -> ${model.attributes.name}`);
 }
});
laptop.set('name', 'Lenovo'); // Name changed: HP -> Lenovo
laptop.destroy(); // Name changed: HP -> Lenovo

/* The on() method may take an optional third argument, an object argument, which it binds to the call back function to. You can pass this to it */
const Tech = Backbone.Model.extend({
  listenForLang: function(lang) {
    lang.on('destroy', function() {
      console.log(`Language: ${this.get('name')}, Level: ${this.get('level')}`);
      console.log(`Language: ${lang.get('name')}, Level: ${lang.get('level')}`);
    }, this); // "this" is our "context" argument
  }
})
const java = new Tech({name: 'Java', level: 1});
const cSharp = new Tech({name: 'C#', level: 3});
java.listenForLang(cSharp);
cSharp.destroy(); // Language: Java, Level: 1  \n Language: C#, Level: 3

/*
 * Custom events
 */
const Monitor = Backbone.Model.extend();
const monitor = new Monitor({name: 'Samsung'});
console.log('Monitor name:', monitor.get('name')); // Monitor name: Samsung
monitor.on('brighten', function(brightness) {
  console.log('Monitor Brightness: ', brightness);
});
/* trigger a custom function using the model trigger() method */
monitor.trigger('brighten', 10); // Monitor Brightness: 10
