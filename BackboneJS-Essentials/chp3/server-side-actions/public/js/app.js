const books = [
    {
        bookId: 1,
        title: 'Backbone.js Essentials', 
        author: 'Jeremy Walker',
        lang: 'JavaScript',
        pages: 180
    },
    {
        title: 'Pro ASP.NET Core MVC 2',
        author: 'Adam Freeman',
        lang: 'C#',
        pages: 1024
    },
    {
        bookId: 3,
        title: 'Laravel Up and Running',
        author: 'Matt Stauffer',
        lang: 'PHP',
        pages: 795
    }
];

/*
 * Backbone server side actions 
 */
/* Defining the REST API endpoint */
const Book = Backbone.Model.extend({
    urlRoot: '/add-book'
});
const book = new Book(books[1]);
console.log('Book: ', book.attributes); //Book:  {title: "Pro ASP.NET Core 2", author: "Adam Freeman", lang: "C#"}
book.save().then(result => console.log('Added: ', result))
           .fail(err => console.error('Error: ', err)); // This will initialise a POST request to the endpoint /books

/* Overriding Backbone Model's url() method. This is used to dynamically assign a value to urlRoot */
const Book2 = Backbone.Model.extend({
    url: function() {
        if (this.get('lang') === 'JavaScript') {
            console.log('Its a JavaScript Book!');
            return '/javascript'
        } else {
            console.log('Just a tech book');
            return '/tech'
        }
    }
});
const book2A = new Book2();
console.log('Book 2A URL:', book2A.url()); // Book 2A URL: /tech

const book2B = new Book2(books[0]);
console.log('Book 2B URL: ', book2B.url()); // Book 2B RUL:  /javascript

//book2A.save();

// It a good idea to store all your URLs in a url object.

/*
 * Backbone idAttribute and id  for Model Identification 
 */

const Book3 = Backbone.Model.extend({
    idAttribute: 'bookId'
}); /* If your API return JSON that contains id, your don't need to specify idAttribute */
const book3 = new Book3(books[2]);
console.log('ID: ', book3.id); // ID: 3
console.log('ID: ', book3.get('id')) // ID: undefined

/* 
 * isNew() method is used to check if a model is new
 */
console.log('Is Book3 new: ', book3.isNew()); // Is Book3 new: false

const book3i = new Book3();
console.log('Is Book 3i new: ', book3i.isNew()); // Is Book 3i new: true
/* Perhaps, Backbone Model is new if it does not have an id i.e a value of it idAttribute property */

/*
 * using the Client ID, cid, as ID on the client side
 */
const bookGroup = {};
const book4a = new Backbone.Model({id: 7});
const book4b = new Backbone.Model()
bookGroup[book4a.cid] = book4a;
bookGroup[book4b.cid] = book4b;
console.log('Book Group:', bookGroup); 

/*
 * using Bacnkbone Model fetch method to get data from server 
 */

 const Book5 = Backbone.Model.extend({
     urlRoot: '/books',
     idAttribute: 'bookId',
 });
 const book5 = new Book5({bookId: 4});
 book5.fetch({
     success: function(model) {
       console.log('Model: ', model);
       books.push(model.attributes);
       console.log('BookId 4', books.find(book => book.bookId == 4));
     },
     error: function(err) {
        console.error(err);
     }
 });

 /*
  * using the fetch jQuery promise retrunred from fetch method 
  */
 const Book6 = Backbone.Model.extend({
     urlRoot: '/books',
     idAttribute: 'bookId',
 });
 const book6 = new Book6({bookId: 5});
 book6.fetch().done(function(attributes) {
                 console.log('BookId 5', attributes);
                 books.push(attributes);
             }).fail(function(err) {
                 console.error('Server Error: ', err);
             });
/* Note the difference between using success/error jQuery callback versus done/fail promise style
 * The Model object is passed to the success() call back 
 * The Model.attributes object is passed to the done() or then() promise method 
 */
console.log("All Books", books);

/*
 * fetching multiple models using jQuery when()  and then() funtion 
 */
const Book78 = Backbone.Model.extend({
    idAttribute: 'bookId',
    urlRoot: '/books'
});
const book7 = (new Book78({bookId: 6})).fetch();
const book8 = (new Book78({bookId: 7})).fetch();
$.when(book7, book8)
  .then(function(result1, result2) {
      console.log('Book78 Result1:', result1[0]);
      console.log('Book78 Result2', result2[0]);

      books.push(result1[0]);
      books.push(result2[0]);
  });

/*
 * Backbone takes the server response from fetch and call set() on it.
 * It assumes the server response is JSON representing the Model attributes 
 */
// A Model object. model.attributes will gove your the attributes
console.log('Book6 Model', book6); // 
// A response object. response.responseJSON will gove you the attributes
console.log('Book7 Model', book7); 

/*
 * when fetch() finishes, Backbone passes the server reponse through it parse() method before set() of the model
 * parse can be override if for example your API returns a JSON that is wrapped in an envelop.  
 */
/* overriding parse() method to modify JSON to desired attributes */
const Book9 = Backbone.Model.extend({
    urlRoot: '/book-array',
    parse: function(response) {
      console.log('Parsing: ', response);
      books.push(response[0]);
      /* because the JSON obejct returned from the server is wrapped in an array [{id: 8, ...}]*/
      return response[0]; // this object will be used at the model attributes
    }
});
book9 = new Book9({id: 8});
book9.fetch().then(function(result){
  console.log('Done Book 9', result);
});

console.log("Book 9", book9); // model 

/*
 * Using the save() method with success() and error callback
 */
const newBook = {
    title: 'Pragmatic Guide to Sass 3',
    author: 'Hampton Catlin & Michael Catlin',
    lang: 'SASS',
    pages: 132
}
const Book10 = Backbone.Model.extend({
    urlRoot: '/add-book',
});
const book10 = new Book10();
book10.save(newBook, {
    success: function(modelResult) {
       console.log('Added Book 10', modelResult);
       books.push(modelResult.attributes);
    },
    error: function(err) {
        console.log('Server Error: ', err);
    }
});

/*
 * using done() and fail() promise method with save() model method  
 */
const newBook2 = {
    title: 'Learn Ionic 2',
    author: 'Joyce Justin & Joseph Jude',
    lang: 'JavaScript',
    pages: 110
};
const book11 = new Book10(newBook2);
book11.save().done(function(result) {
               console.log("Added Book11", result);
               books.push(result);
            }).fail(function(err) {
                console.error("Error: ", errr);
            });

/*
 * Backbone parses whatever it send to the server using the model toJSON() method
 * If you attribute need modification before it is send to the server you can override the toJSON() method 
 */
/* overriding the toJSON method to unwrap object from array */
/*
const bookArray  = [
    {
        title: 'Leanring React',
        author: 'Alex Banks & Eve Porcello',
        lang: 'JavaScript',
        pages: 350
    }
];
const Book12 = Backbone.Model.extend({
    urlRoot: '/add-book',
    toJSON: function(options) {
        console.log('Book Array', bookArry);
        return bookArray[0];
    }
});
const book12b =  new Book12(bookArray);
book12b.save().then(attributes => {
              console.log('Book 12', attributes);
              books.push(attributes);
            }).fail( err => console.log('Error: ', err));
*/
/* This example is not working as expected  */

/*
 * to validate anything before it is sent to the server, you can override the valudate method.
 * return true for valid data and false for invalid data which will make the save operation to fail 
 */
const newBook3 = {
    author: 'Mathew MacDonald',
    lang: 'C#', 
    page: 780
};
const Book11 = Backbone.Model.extend({
  urlRoot: '/add-book',
  initialize: function() {
    this.on('invalid', function(model, error) {
      console.error(error); //error is same as this.validationError 
      // console.error(this.validationError);
      console.error('Invalid:', model.attributes);
    });
  },
  validate: function(attributes, options) {
      // options is the second argument passed to set() or save()
      if(attributes.title == undefined) {
        return new Error('Attributes should have a title');
        /* for older version you may need to return true or false if invalid
         * for the current verson 1.4.0 you need to return Error or nothing if valid
         */
      }   
  },
});

const addedTitle = {...newBook3, title: 'Beginning ASP.NET 4 in C# 2010'};
const book12 = new Book11(newBook3);

const falseOrPromise = book12.save(); // save will return false if validation fails or promise if POST went through
if (falseOrPromise){
    falseOrPromise.done(result => {
                    // validation passed and AJAX passed
                    console.log('Book 12', result);
                    books.push(result);
                }).fail(error => {
                    // validation passed but AJAX failed
                    console.log('Server Error: ', error)
                });
} else {
    // Validation failed
}


const book13 = new Book11();
book13.save(newBook3, {
    success: function(result) {
        console.log('Book 13 Result', result);
        books.push(result.attributes);
    },
    error: function(error) {
        console.error('Error', error);
    }
}); /* This will return model.attributes = {} but using the .done().fail() method above will return the attributes */
// Beginning ASP.NET 4 in C# 2010


/*
 * Backbone destroy() 
 */
 book5.destroy({
     success: function(model, response, options) {
       console.log('Destroy model', model);
       console.log('Destroy response', response);
       console.log('Destroy option', options);
     },
     error: function(err) {
       console.error('Destroy Error', err);
     }
 });

 /* adding events for destroy */
 /*
 book6.on('destroy', function(args) {
     console.log('Destroy event on book6 triggred:', args);
 });
 book6.on('request', function(args) {
     console.log('Request for book6 delete has been sent:'), args;
 })
 */
 book6.on('sync', function(model) {
    console.log('Server has responded to book6 delete event', model)
 });
 book6.destroy();

/* 
 * use the isValid() method to check if model is valid before POSTing
 */
if (book12.isValid()) {
    console.log('Sending Book12 through');
} else {
    console.log('Book 12 failed validation');
}

/*
 * model.key() returns all the keys of the attributes of the model 
 */
const keys12 = book12.keys(); // same as _.keys(book12.attributes)
console.log('Keys 12:', keys12); // ["author", "lang", "page"]

/*
 *  model.values() returns all the values of the attributes object
 */
const values12 = book12.values(); // same as _.values(book12.attributes)
console.log('Values 12', values12); //  ["Mathew MacDonald", "C#", 780]

/*
 * model.pairs() returns array of attribute key/value pair i.e [ [key1, value1], [key2, value2], [key3, value3] ]
 */
const pairs12 = book12.pairs();
console.log('Pairs 12', pairs12); 

/*
 * model.invert() returns the attribute with keys and values switched i.e {pages: 190} becomes {190: pages}
 */
const invert12 = book12.invert();
console.log('Invert 12', invert12);

/*
 * model.pick() returns the keys and values of specified attributes 
 */
const author = book12.pick('author'); 
console.log('Pick 12', author); // {author: "Mathew MacDonald"}

/*
 * model.omit() returns key and value for every attribute except those specified
 */
const allButAuthor = book12.omit('author');
console.log('Omit 12', allButAuthor); // {lang: "C#", page: 780}