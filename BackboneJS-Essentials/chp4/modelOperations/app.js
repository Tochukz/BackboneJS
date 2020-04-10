/* subclassing  the Collection class*/
const Cars = Backbone.Collection.extend({});

/* Instantiating a collection with an array of Models or Model attributes */
const salonCars = [
    {
        make: 'Toyota',
        color: 'White',
        year: 2016
    },
    {
        make: 'Honda',
        color: 'Red',
        year: 2005
    }
];
/* You can pass an array of Models or Models attributes and Backbone will convert them to Models */
const cars = new Cars(salonCars);

// Do not access models directly like this
const car1 = cars.models[0]; // returns the first model
const carsLen = cars.length; // 2, same as cars.models.length
console.log('Car1 ', car1);
console.log('Cars Length', cars.models.length)

/* Setting the model property of a collection */
const Cat = Backbone.Model.extend();
const cat = new Cat();
const Cats = Backbone.Collection.extend({model: Cat});
/* The model property of a Collection is only used when new Models are created through the Collection,
   e.g when the collection is initialized with an array of attributes */
const topCat = {
    color: 'Black',
    age: 1.5,
};
const topCats = new Cats([topCat]);
console.log(topCats.models[0] instanceof Cat); // true

/* The create method of a collection converts its attributes argument to a model, add the model to the collection and save it to the server
   The new model is saved to the server by a POST request to the url/urlRoot defined by the Model class
   The type of the model will be the type defined by the model property of the collection. */
const Laptop = Backbone.Model.extend({
    url: '/laptop'
});
const Laptops = Backbone.Collection.extend({model: Laptop});
const laptops = new Laptops();
const lenovo = {
    name: 'Lenovo',
    ram: '4GB',
    hdd: '500GB'
};
laptops.create(lenovo);
console.log(laptops.models[0] instanceof Laptop); // true
/* Calling the create(attributes) method is equivalent to doing the following: create model from attributes, add model to collection, save model */
const dell = {
    name: 'Dell',
    ram: '8GB',
    hdd: '1000GB'
};
const dellLaptop = new Laptop(dell);
laptops.models.push(dellLaptop);
dellLaptop.save();
console.log(laptops.models[1] instanceof Laptop); // true

/* A collection can contain Models of different type apart from the type defined by the model property
 * But the type defined by the model property is what is used when a new model is created via the collection create() methods or added via the add() method
 * Also the model type is used when the collection is initialized with an array of attributes.
 */

/*
 * use add() method to add individual Model or attributes or array of Model or array of attributes to collection
 */
const kitchenChair = {
    type: 'Chair',
   color: 'Black',
   material: 'Wood'
};
const funitures = new Backbone.Collection();
funitures.add(kitchenChair);
console.log('First Funiture', funitures.models[0]); // returns the first model
console.log('First Funiture Color:', funitures.models[0].get('color'))

/*
 * use reset() method to replace all the existing models in a collection with another model or array of model
 */
const centerTable = {
  type: 'Table',
  color: 'Transparent',
  material: 'Glass'
};
funitures.add(centerTable);
console.log('Current count: ', funitures.length); //2

const couch = {
    type: 'Chair',
    color: 'Brown',
    material: 'Swade'
};
funitures.reset(couch);
console.log('New count: ', funitures.length); // 1

/*
 * use the get() method to retrieve a model from a collection given the model's id or cid
 */
const pug = {
    id: 1,
    name: 'Pug',
    type: 'Dog',
    color: 'Gray'
};
const lizard = {
    id: 2,
    name: 'Lizard',
    type: 'Reptile',
    color: 'grey'
};
const Animal = Backbone.Model.extend();
const Animals = Backbone.Collection.extend({model: Animal});
const animals = new Animals([pug, lizard]);

// retreive model with specified id
const pugModel = animals.get(1); // returns the mode with the id of 1, pug model in this case
console.log("First animal: ", pugModel.get('name')); // Pug

// retrieve model with specified cid (Client ID)
const pig = {
    id: 3,
    name: 'Pig',
    type: 'Mammal',
    color: 'Pitch'
};
const pigModel = new Animal(pig);
animals.add(pigModel);
console.log('Total animals:', animals.length); //3

const thePigModel = animals.get(pigModel.cid); //return the pigModel
console.log('name attribute', thePigModel.get('name')); // Pig

/*
 * use remove() method to delete a model from a collection, given the model's id
 */
console.log('Total Animals: ', animals.length); // 3
animals.remove(2); // remove model with id value of 3
console.log('New Total', animals.length); // 2

/*
 * use the array methods to add and remove Models from a Collection
 * push(), pop(), unshift(), shift(), slice()
 * This collection methods behave same way they do in native Array object
 */
console.log('Total Animals: ', animals.length); // 2

/* add a model to bottom of the collection using push() */
const sheep = {
    id: 4,
    name: 'Sheep',
    type: 'Mammal',
    color: 'White'
};
animals.push(sheep);
console.log('Total After Sheep', animals.length); // 3
const lastSheep = animals.get(4);
console.log('Last Ship', lastSheep); // returns the sheep model

/* retreive last model from collection using pop() */
const latestSheep = animals.pop();
console.log('Total afer pop', animals.length); // 2
console.log('Popped model name:', latestSheep.get('name')); // Sheep

/* add model to top of collection using unshift() */
console.log('Curent Models:', animals.models); //
const shark = {
    id: 5,
    name: 'Great White',
    type: 'Fish',
    color: 'White'
};
animals.unshift(shark);
console.log('Total after shark', animals.length); // 3
console.log('Model of id 5', animals.get(5)); //model

/* remove and retrieve the first model in the collection using shift() */
const firstModel = animals.shift();
console.log('Total after shift', animals.length); //2
console.log('Retrieved animal name: ', firstModel.get('name')) // Great White

/* get a copy of the subset of the collection using slice slice()*/
const threeAnimals = [
   {
     id: 6,
     name: 'Hippi',
     type: 'Mammal',
     color: 'Grey'
   },
   {
     id: 7,
     name: 'Tiger',
     type: 'Mammal',
     color: 'Yellow'
   },
   {
     id: 8,
     name: 'Squid',
     type: 'Fish',
     color: 'Black'
   },
];
animals.add(threeAnimals);
console.log('Total after 3Animals', animals.length); //5

const modelAttributes = animals.models.map(model => model.attributes);
console.log('All current models by their attributes: ', modelAttributes); // array of attributes

/* note that the number argument of the slice() function represents the model index and NOT the model id*/
const models3To6 = animals.slice(3, 7);
const model3To6Attributes = models3To6.map(model => model.attributes);
console.log('Models 3 To 6', model3To6Attributes); // array of attributes
console.log('Total after slice: ', animals.length); // 5. Length remains unchanged



/* the at() method returns the model from a collection based on the model's index. It is zero based */
const modelAtIndex1 = animals.at(1);
console.log('Model at Index 1', modelAtIndex1); //return the model

/*** Sorting **/
/* to sort models by an attribute, specify the attribute name as a comparator */
const attributeArray = animals.models.map(model => model.attributes);
const Animals2 = Backbone.Collection.extend({model: Animal, comparator: 'name'});
const animals2 = new Animals2(attributeArray);
const animals2Attributes = animals2.models.map(model => model.attributes);
console.log('Sorted by name', animals2Attributes); //

/*
//You skip specific element from the sorting flow by defining a function as a comparator
const WildCat = Backbone.Collection.extend({
  comparator: function(cat) {
  if (cat.get('name') == 'Heathcliff') return '0';
    return cat.get('name');
  }
});
// This does not seem useful to me.
*/

/* sorting with custom comparator*/
const Animals3 = Backbone.Collection.extend({
  model: Animal,
  comparator: (model1, model2) => {
    const number = model1.get('color') > model2.get('color')? 1 : -1
    return number
  }
}); // The custom comparator function is like native array sort() function.
/* With the comparator function you can do multiple sort, i.e sort by color and if color for two model is same(ie. diff == 0) then sort by name*/

const animals3 = new Animals3(attributeArray);
const animals3Attributes = animals3.models.map(model => model.attributes);
console.log('Sorted by color: ', animals3Attributes);

/* Use the where() method to query a collection */
const mammals = animals3.where({type: 'Mammal'});
console.log('Mammals: ', mammals.map(m => m.attributes));

/* Use the findWhere() to query a collection returns only the first result if finds*/
const firstMammal = animals3.findWhere({type: 'Mammal'});
console.log('First Mammal', firstMammal.attributes);

/* use sortBy() method to sort the collection */
const sortedByName = animals.sortBy('name');
console.log('using sortBy method', sortedByName.map(m => m.attributes));

/* toArray() returns array of all the models in the collection */
console.log('The Collection',  animals);
console.log('using toArray method', animals.toArray());
/* collection.toArray() is give same results as collection.models */

/* using the groupBy() method to group animals by the type attribute */
const groupedAnimals = animals.groupBy(animal => animal.get('type'));
console.log('Grouped Animals', groupedAnimals);
const mammalGroup = groupedAnimals.Mammal;
const fishGroup = groupedAnimals.Fish
console.log('Mammal Group', mammalGroup.map(ani => ani.attributes));
console.log('Fish Group', fishGroup.map(ani => ani.attributes));
