const Appliance = Backbone.Model.extend({
    idAttribute: 'AId',
    url: '/electronics',
    initialize: function() {
      this.on('invalid', (model, err) => {
        console.error(err);
        console.log('Invalid attribute(s): ', model.attributes);
      })
    },
    validate: (attributes) => {  // The validate function is only called when the model is save by calling its save() method
      const requireFields = ['AId', 'name', 'manufacturer', 'model'];
      const keys = Object.keys(attributes);
      const pass = requireFields.every(field => keys.includes(field) && attributes[field]) ;
      if (!pass) {
        return new Error(`Invalid Attribute error`);
      }
    }
});

/* Initializing events in Collection class*/
const Electronics = Backbone.Collection.extend({
    model: Appliance,
    comparator: 'name',
    initialize: function() {
      this.on('add', (model) => {
        console.log('New Electronics added', model.attributes);
        console.log('Total Electronics:', this.length);
      });
      this.on('remove', (model) => {
        console.log('Electronic deleted', model.attributes);
        console.log('Total Appliances:', this.length);
      });
      this.on('reset', (args) => {
        console.log('Collection reset', args)
      });
      this.on('sort', (collection) => {
        console.log('Collection is sorted');
        console.log('Collection Length', collection.length);
        console.log('Collection Models', collection.models.map(model => model.attributes));
      });
      this.on('invalid', (model) => {
        console.error('Invalid Model', model.attributes);
        console.log(`removing invalid model with cid ${model.cid}`)
        this.remove(model.cid);
      });
      this.on('error', (model, err) => {
        console.log(`Ajax Error, ${err.status} ${err.statusText}`, model.attributes);
        console.error('Ajax Error Details', err);
      });
      this.on('sync', (args) => {
         console.log('Ajax request has been completed');
      });
      this.on('change', (model) => {
        // This listen for change events on the models. You can also listen for other model events
        console.log('Model has been changed', model.attributes);
      })
      this.on('myCustomEvent', (arg) => {
        console.log('Custom Event triggered', arg);
      })
      this.on('all', (eventName, model) => {
        //console.log('An event occured', eventName, model);
      })
    }
});

const createAppliance = function(AId, name, manufacturer, model) {
  return {
    AId,
    name,
    manufacturer,
    model
  }
}

/* Create an instance of the collection an initilize with a single model*/
const electronics = new Electronics([ createAppliance(1, 'Dell Inspiron', 'Dell', 'Dell Inspiron 289') ]); // Does NOT trigger add event

/* Add a model */
electronics.add( createAppliance(2, 'Samsumg TV', 'Samsung', 'Samsung Smart TV 32 Inches')); // triggers 'add' and 'sort' events

/* Add an array of models */
const twoAppliances = [createAppliance(3, 'Apple i11', 'Apple Inc', 'i11'), createAppliance(4, 'Arius Yamaha', 'Yamaha', 'Arius 144b')];
electronics.add(twoAppliances); // triggers 'add' and 'sort' event

/* delete a model */
electronics.remove(1); // triggers 'remove' event

/* Add an invalid model */
electronics.add(createAppliance(5, 'Fake Appliance')); // triggers the 'add' and 'sort' events
// The above Model is added to the collection event though it is invalid.

/* Save an invalid model*/
electronics.get(5).save(); // Will trigger the 'invalid' model event and hence the 'invalid' collection event

/* update a model */
electronics.get(2).set({name: 'Samsung Smart'}); // triggers the 'change' event of the collection

/* trigger custom event manually */
electronics.trigger('myCustomEvent', {msg: 'Chucks is Architech'});

/* Save a valid model*/
electronics.get(2).save(); // triggers the 'error' event because server is not accessable.
