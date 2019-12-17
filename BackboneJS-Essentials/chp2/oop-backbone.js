/* 
 * Extending BackBone class
 */
//Define your constructor
const Book = function () {
    this.currentPage = 1;
    this.totalPages = 10;
}

// Assign BackBone class as Parent class to your class
Book.prototype = new Backbone.Model();

// Add method to Parent class
Book.prototype.turnPage = function() {
    this.currentPage += 1;
    return this.currentPage;
}

const book = new Book();
console.log(`Book `, book);
console.log('Curent Page: ', book.currentPage);
book.turnPage();
console.log('Turn Page: ', book.currentPage);


/**
 * Extending backbone class with the extend method  
 */
const Mouse = Backbone.Model.extend();  
const mouse = new Mouse();
console.log(mouse);
mouse.destroy();

/**
 * Adding instance property and method to backbone child class
 */
const Laptop = Backbone.Model.extend({
    ram: 512,
    upgradeRam: function(addRam) {
        this.ram += addRam;
    }
});
const laptop = new Laptop();
console.log('Ram: ', laptop.ram);
laptop.upgradeRam(512);
console.log('New Ram', laptop.ram); //1024

/**
 * Adding static property and method to backbone child class
 */
const Television = Backbone.Model.extend({}, {
    size: 32,
    chanegSize: function(newSize ) {
      this.size = newSize;
    }
});
const tv = new Television();
// Static properties/methods cam only be called on a class
console.log('Instance Size', tv.size); // undefined 

console.log('Static Size', Television.size); // 32
Television.chanegSize(42); 
console.log('New size', Television.size);

/**
 * JavaScript parent class method call from child class 
 */
const Parent = function() {}
Parent.prototype.addUser = function(username, email) {
  this.username = username;
  this.email = email;
}

const Child = function() {};
Child.prototype = Object.assign({}, Parent.prototype);
Child.prototype.addUser = function(username, email) {
  //Parent.prototype.addUser.apply(this, [username, email]);
   Parent.prototype.addUser.call(this, username, email);
}
const child = new Child();
child.addUser('Tochukz', 'truetochukz@gmail.com');
console.log('Username: ', child.username); // Tochukz
console.log('Email: ', child.email); // truetochukz@gmail.com
/* The apply() and call() methods are available in all function because JaaScript functions are objects
 * The apply() and call()  method are similer except that the apply accpet aruments for the function as array element while class  accept inividual argument 
 */

/**
 * Calling method of Backbone parent class from child class
 */
const Manual = Backbone.Model.extend({
  localDestroy: function() {
      const arguments = [];
      Backbone.Model.prototype.destroy.apply(this, arguments);
  }
});
const manual = new Manual();
manual.localDestroy();