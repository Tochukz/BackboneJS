# Mastering Backbone.js (2016)
__By Abiee Echamea__  
[Code Example](https://github.com/abiee/mastering-backbone)

## Chapter 1: Application Architecture of a Backbone application
### Subapplication based architecture
A _subapplication_ is like a small Backbone application; they should be independent of other subapplications and work as a standalone.  
We use an _infrastructure_ application to coordinate the subapplications and provide them with services such as confirmation, dialogue messages, notification pop-ups, modal boxes etc.
For example, you should be able to put the say Compose mail subapplication on a black page without any other subapplication and still be able to send emails.

### Responsibilities of Backbone objects  
 __Views__   
 They are responsible for handling the DOM and listening for low-level jQuery/DOM events and to transform them into domain events. Like for example transforming a native click event to a custom backbone `save:contact` event.  
 Business logic on view should be avoided. Basic validation is allowed but complex validations should be done on the model or the controller.  

 __Models__
They are responsible for fetching and saving data to and from a RESTful service. They perform general-purpose business logic such as validation and data transformation.

__Collections__  
They are a container for an array of models. They fetch list of models from the REST API. They should be used as readonly and should not write to the server and should not contain business logic.

__Routers__  
They listen for URL changes in the browser and transform them into a call to a handler.  

### Objects not provided by Backbone  
__Subapplication facade__   
This object is the public interface of the subapplications. Any interaction with the subapplications should be done through its methods.

__Subapplication controller__  
A controller for views, models and collections. When given a Backbone data object, it will instantiate and render the appropriate views and then coordinate them.  
