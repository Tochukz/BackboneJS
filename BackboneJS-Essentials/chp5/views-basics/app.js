/* The 'el' property can be any DOM selector string. 
 * If it is not assigned it will be created from the values of the 'tagName', 'className', 'id' and 'attributes' properties.
 * If none of the above properties are set then an 'el' value is made and empy div .
 */

/* Creating an instance of View directly from the View class */
const p = new Backbone.View({
    el: '<p>Test Paragraph View</p>',
});

$('#app').append(p.el);

/* Extending the View class */
const Form = Backbone.View.extend({});

const form1 = new Form({
    el: '<form><input placeholder="username" /></form>',
});
const $inputElem = form1.$('input'); // The $ property of the view object acts like jquery's find function for find element inside the view's template.
$inputElem.val('Tochukwu');
/*By convention, any variable that references a jQuery object is usually prefixed with the $ charater. */

$('#app').append(form1.el);


const regForm = new Form({
    attributes: {
        method: 'post',
        id: 'regForm', 
        action: '/register'
    },
    el:'#app2',
});

regForm.$el.append('<form></form>')
const isForm = regForm.$el.is('form');
console.log(isForm); //false

/** Handling events */
const ButtonView = Backbone.View.extend({
    el: '<button>Submit</button>',
    initialize: function() {
        /* event binding using underscore's bind() method*/
        this.$el.on('click', _.bind(this.handleClick, this));
    },
    handleClick: function() {
        alert('You clicked the Submit button')
    }
})
const button = new ButtonView();
const $button = button.$el;
$button.text('Send');

$('#app').append(button.el);

/* use the 'events' property for event binding instead of undeerscore's bind() method */
const ButtonComp = Backbone.View.extend({
    el: '<button>Register</button>',
    events: {
        click: 'handleClick',
    },
    handleClick: function() {
        alert('You clicked the register button')
    }
});
const regButton = new ButtonComp();
$('#app').append(regButton.el);

/* 
 * If you change a view's el property manually e.g 
 * myView.el = $('#newElem')
 * Backbone will not hook your events to the new the new element. 
 * You will have to call Backbone's delegateEvents method so that Backbone can hook your events to the new element.  
 * To avoid this, you can use the setElement() method which set the new element and also automatically hooks you event to the new element.
 */
const clearButton = new ButtonView();
//clearButton.el = $('#staticBtn'); 
clearButton.setElement($('#staticBtn')); // This doesn't seem to work.
console.log('clear button', clearButton.el);
$('#app').append(clearButton.el);  

/** Rendering Strategies */
/* Using Underscore's template method */ 
const context = {
    name: 'Tochukwu',
    title: 'Developer Architech',
    city: 'Cape Town'
};
const templateStr = '<%= name %> is a <%= title %> who lives in <%= city %>';
const template = _.template(templateStr);
$('#content').append(template(context));
/* The template function is usually used with an html template string and a Backbone Model as context */ 

/* Simple templating using Underscore's template() method */
const userTemplate = _.template(
    `
      <div>
        <p>
          <strong>Name</strong>
          <span><%= name %></span>
        </p>
        <p>
          <strong>City</strong>
          <span><%= city %></span>
        </p>
      </div>
    `
);
const User = Backbone.Model.extend({});
const UserView = Backbone.View.extend({
    model: User, 
    template: userTemplate,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()))
      return this;
    }
});

const user = new User({name: 'Tochukz', city: 'Cape Town'});
const userView = new UserView({model: user});
const userHtml = userView.render().$el.html();
$('#content').append(userHtml);
/* The HTML template can be separeted to a different file and brought in using jQuery or a dependency library such as Require.js */

/* Advance templating using 3rd party templating libraries  */
/*
 * You can use one of the following templating engines: Handlebars, Musstache, Hamljs, or Eco. 
 * These template engine offers the possibility of including logic inside the template. For example using if statement...
 */ 

 /* Logic-based view without using a template */
 const PersonView = Backbone.View.extend({
     render: function() {
         const para = new Backbone.View({tagName: 'p'});
         const strongElem = new Backbone.View({tagName: 'strong'});
         const spanElem = new Backbone.View({tagName: 'span'});
         strongElem.$el.text('Person Name: ')
         spanElem.$el.text(this.model.get('name'));
         para.$el.append(strongElem.el);
         para.$el.append(spanElem.el);
         this.$el.html(para.el);
         return this;
     }
 })

 const personModel = new Backbone.Model({name: 'Chucks'});
 const personView = new PersonView({model: personModel});
 const personHtml = personView.render().$el.html();
 $('#content').append(personHtml);
 /* The logic approached make it difficult for designers, whoe are not familier with javascript, to work on the UI */

/* Comnining template-based and logic-based views */
const animals = [
    {
        name: 'Sheep',
        color: 'red'
    },
    {
        name: 'Dog',
        color: 'blue',
    },
    { 
        name: 'Cat',
        color: 'green'
    },
];

const LiView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(`<%= name %>`),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.css({ color: this.model.get('color') });
        return this.$el;
    }
});

const UlView = Backbone.View.extend({
    render: function() {
        this.$el.empty();
        this.collection.each(model => { 
            let liView = new LiView({ model });
            this.$el.append(liView.render());
        });
        return this;
    }
});
const animalsCollection = new Backbone.Collection(animals);
const ulView = new UlView({ collection: animalsCollection });
const ulHtml = ulView.render().$el.html();
$('#content').append(ulHtml)
