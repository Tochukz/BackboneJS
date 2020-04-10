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

__Create Model Class__  
```

```

__Model class options object properties and methods__  
* _idAttribute_ `String`
* _url/rootUrl_ `String`
* _initialize_ `Func`
* _validate_ `Func`
* _parse_ `Func`
* _toJSON_ `Func`

__Attributes versus Properties__  
Backbone's Model class can have regular _properties_ and _atttributes_. Attributes are properties of the 'attributes' property.
You should use an attribute to store data when:
* the data is going to be synced to the server
* you want other parts of your code to be able to listen for data changes
If your data doesn't meet these requirements, it's best to store it as a regular JavaScript property.

Any of the core persistent information that a Model class is designed to hold belongs in its attribute, while any information that is secondary or derived, or which is only designed to last until the user refreshes the page, should be stored as properties.

Models have several different events available for you to listen to.  
__Model Events__  
* _change_ triggered when a model attribute is updated using the `set()` method
* _change: attribute_ for change of the specified attribute
* _destroy_ triggered when model is `destroy()` method is called
* _request_ triggered when an AJAX request starts
* _sync_ triggered when of AJAX request completes
* _error_ triggered when error occur from an AJAX
* _invalid_ triggered when attributes validation fails after the `validate()` method is called. Note that the `validate()` is only called when the model is saved using the  `_save()_` method or when `isValid()` method is called

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

Every model has three method to interact with the server - _fetch_, _save_ and _destroy_.  

## Chapter 4: Organizing Models with Collections  
Collections wrap an array and offer several advantages over using the array directly:
* Uses Backbone's class system, makes it easy to define methods and create subclass  
* Allows Other code to listen for and respond when Models are added,  modified or removed  
* It encapsulates the logic for communicating with the server  

__Create Collection Class__  
```
const CollectionClass = Backbone.Collection.extend({...optionObject})
```
__Collection option object properties and methods__  
* _model_: `Type`, specifies the model type  
* _comparator_: `String|Func`, specifies the attribute to be used to sort the models. You may define you own custom function to sort models.  
* _initialize_: `Funct`, called when an instance of the collection is created.

__Collection Methods__  
* _create(attributes)_ convert attributes object to model, add model to collection and save the model to server.
* _add(model/attribute)_ converts attribute object to model and adds to collection
* _get(modelId)_ returns model with the specified id or cid (Client ID).
* _remove(modelId)_ removes model with the specified ID from the collection
* _rest([attrbuteArray])_ empty collection and add new array of model or attributes to collection.
* _at(index)_ returns model at the specified index    
* _push()_, _pop()_, _unshift()_, _shift()_, _slice()_ they work the same as native array methods of the same names.  
A collection object has many other method that are have the same name and work the same way as native Array type. They are referred to as _underscore methods_ .

__Collecion Events__  
* _add_ triggered when a model is added.
* _remove_ triggered when a model is removed.
* _reset_ triggered when the collection is rest.
* _sort_ triggered when the collection is sorted.
* _invalid_ triggered when the _invalid_ event of a model is triggered.
* _error_ triggered when an error event occurs during an AJAX request.
* _sync_ triggered after AJAX request is completed.
* _change (and other model events)_ triggered when the corresponding model event is triggered for any of it's model.
* _customEvent_ triggered manually by a call to the _collection.trigger('customEvent')_ method.
* _all_ triggered when any event is triggered.

__Server-side action__  
Collection's _fetch_ will merge any new data from the server with any data it already has. If you prefer to replace your local data with server data entirely, you can pass a `{reset: true}` option when you fetch.  
Collections also have the `url`, `parse` and `toJSON` methods.  

## Chapter 5: Adding and Modifying Elements with Views   
