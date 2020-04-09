# Backbone Essentials (2015)  
__By Jeremy Walker__  
## Chapter1: Building Single-Page Site Using Backbone
Backbone requires JQuery and optionally Underscore.    
Backbone is made up of the following five major tools.  
* A class system
* A Model class
* A Collection class
* A View class
* A Router class

## Chapter 2: Object-Oriented JavaScript with Backbone Classes  
Every variable in JavaScript is either an Object, a function or a Primitive.  

The new keyword does four thing when used for a function:
1. Creates a brand new object({}).     
2. Sets _this_ inside the initialization function to the newly created object.    
3. Returns the new Object and ignore return statement in the function.   
4. Sets the \__proto\__ of the new object it creates to the *prototype* property of the initialization function.   

Every object in JavaScript has two special properties: *prototype* and \__proto\__.  


## Chapter 3: Accessing Server Data with Models  
Models offer three major advantages:  
* Models use Backbone's class system  
* Models allow other code to listen for and respond to changes in the _Model_ attributes  
* Models simplify and encapsulate the logic used to communicate with the server   

__Attributes versus Properties__  
Backbone's Model class can have regular _properties_ and _atttributes_. Attributes are properties of the 'attributes' property.
You should use an attribute to store data when:
* the data is going to be synced to the server
* you want other parts of your code to be able to listen for data changes
If your data doesn't meet these requirements, it's best to store it as a regular JavaScript property.

Any of the core persistent information that a Model class is designed to hold belongs in its attribute, while any information that is secondary or derived, or which is only designed to last until the user refreshes the page, should be stored as properties.

Models have several different events available for you to listen to.  
__Model Events__  
* _change_ for change of any attribute
* _change: attribute_ for change of the specified attribute
* _destroy_ for when the model is destroyed
* _request_ for the start of AJAX method of the model
* _sync_ for complete of AJAX method of the model
* _error_ for error of AJAX method of the model
* _invalid_ for failure of validation of the Model _save_ or _isValid_ method is called

__Model Methods__  
* _set(key, value)_:        
sets an attribute. It has an overloaded version that accepts an object so you can set multiple attributes.  
* _unset(key)_ deletes an attribute from the model.   
* _get(key)_ returns the value of an attribute with the specified key.  
* _on('event', callback)_ users the an event listener on the model. The first argument can be made to listen for a single attribute eg _on('change:name', callback)_ or listen for multiple events eg _on('change destroy', callback)_ a `model` object gets passed to the `callback` function. You can also set `custom` events.
* _trigger(customEvent)_ triggers a custom event.
* _off(event)_ stop listening for an event on a model.   
* _destroy()_ destroys the model.
* _save()_ used to save the model to the server.
* _isNew()_ returns true if the model has not been initialized with attributes object.  It may also be considered new if it does not have an `id`.  

__Collection Related Events__  
* _add_ for when the model is added to a collection
* _remove_ for when the model is removed form a collection
* _reset_ for when the collection the model belongs to is reset.

__The all Event__
* _all_ triggered in response to any of the other model events.

Every model has three moethod to interact with the server - _fetch_, _save_ and _destroy_.  

## Chapter 4: Organizing Models with Collections  
Collections wrap an array and offer several advantages over using the array directly:
* Uses Backbone's class system, makes it easy to define methods and create subclass  
* Allows Ohter code to listenfor and respond when Models are added,  modified or removed  
* It encapsulates the logic for communicating with the server  
