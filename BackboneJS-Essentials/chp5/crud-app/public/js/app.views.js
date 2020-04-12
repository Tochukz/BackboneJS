$(document).ready(function() {
    getUsersCollection();
    
    $('#clearBtn').css({display: 'none'});
    $('#updateBtn').css({display: 'none'});
  
    $('#addBtn').click(addUser);
    $('#clearBtn').click(resetForm);
    $('#updateBtn').click(updateUser);
    $('#fetchBtn').click(fetchUser);
  });
  
/** View Models */
const FormGroup = Backbone.Model.extend();
const Button = Backbone.Model.extend();
const Row = Backbone.Model.extend();
const UserInfo = Backbone.Model.extend();

/** View Collections */
const FormFieldCollection = Backbone.Collection.extend({model: FormGroup});
const RowCollection = Backbone.Collection.extend({model: Row});
  
/** Views */
/* Form Control Component */
const FormGroupView = Backbone.View.extend({
    model: FormGroup,
    template: _.template(`
      <div class="form-group">
        <input type="<%= type %>" id="<%= id %>" class="form-control" placeholder="<%= label %>" />
      </div>
    `),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()))
      return this.$el;
    }
});
  
/* Button Component */
const ButtonView = Backbone.View.extend({
    tagName: 'span',
    model: Button,
    template: _.template(`<button class="btn btn-primary" type="button" id="<%= id %>"><%= label %></button> `),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
    }
});
  
/* Row Component */
const RowView = Backbone.View.extend({
    tagName: 'tr',
    model: Row,
    template: _.template(`
        <td><%= userId %></td>
        <td><%= firstname %></td>
        <td><%= lastname %></td>
        <td><%= email %></td>
        <td><%= city  %></td>
        <td>
            <button onclick="editUser(<%= userId %>)">Edit</button>
        </td>
        <td>
            <button onclick="deleteUser(<%= userId %>)">Delete</button>
        </td>
    `),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this.$el;
    }
    
});

/* Users Table Body Component */
const TableBodyView = Backbone.View.extend({
    tagName: 'tbody',
    id: 'tableBody',
    collection: RowCollection,
    render: function() {
      this.$el.empty();
      this.collection.map(model => {
        let row = new RowView({ model });
        this.$el.append(row.render());
      });
      return this.$el;
    }
});

/* User Details Component */
const UserView = Backbone.View.extend({
   tagName: 'tbody',
   id: 'fetchBody',
   model: UserInfo,
   template: _.template(`
        <tr> 
            <td><strong>ID</strong></td>
            <td><%= userId %></td>
        </tr>
        <tr> 
            <td><strong>Firstname</strong></td>
            <td><%= firstname %></td>
        </tr>
        <tr> 
            <td><strong>Lastname</strong></td>
            <td><%= lastname %></td>
        </tr>
        <tr> 
            <td><strong>Email</strong></td>
            <td><%= email %></td>
        </tr>
        <tr> 
            <td><strong>City</strong></td>
            <td><%= city %></td>
        </tr>
   `),
   render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this.$el;
   }
});

/* Creating instances of Button */
const addBtnViewModel = new Button({
    label: 'Add',
    id: 'addBtn',
});

const clearBtnViewModel = new Button({
    label: 'Clear',
    id: 'clearBtn'
});

const updateBtnViewModel = new Button({
    label: 'Update',
    id: 'updateBtn'
});
  
/* The Form Component*/
const Form = Backbone.View.extend({
collection: FormFieldCollection,
render: function() {
    this.collection.each(model => {
    let formGroupView = new FormGroupView({ model });
    this.$el.append(formGroupView.render());
    });
    const addBtn = new ButtonView({ model: addBtnViewModel });
    const clearBtn = new ButtonView({ model: clearBtnViewModel });
    const updateBtn = new ButtonView({ model: updateBtnViewModel });
    this.$el.append(addBtn.render(), clearBtn.render(), updateBtn.render());
    return this.$el;
}
});
  
  /** Creating an instance of Form */
  const formFields = [
    {
      label: 'userId',
      id: 'userId',
      type: 'hidden',
    },
    {
      label: 'Firstname',
      id: 'firstname',
      type: 'text',
    },
    {
      label: 'Lastname',
      id: 'lastname',
      type: 'text',
    },
    {
      label: 'Email',
      id: 'email',
      type: 'text',
    },
    {
      label: 'City',
      id: 'city',
      type: 'text',
    }
  ];
  
  const formFieldCollection = new FormFieldCollection(formFields);
  const form = new Form({collection: formFieldCollection});
  $('#form').append(form.render().html()); 