
/** Models */
const User = Backbone.Model.extend({
    urlRoot: '/user',
    idAttribute: 'userId',
    initialize: function() {
        this.on('invalid', (model, err) => {
          console.error(err.message, model.attributes);
          showError(`Model error: ${err}`)
        });
        this.on('error', (err, args) => {
            showError(`Ajax fetch error: ${err.status} ${err.statusText}`);
            console.error('Ajax Model Error', err, args);
        });
        this.on('sync', (model , attributes) => {
            if (attributes.firstname) {
                generateBody(model);
            }
            console.log('Ajax complete Model', model)
            console.log('Ajax Complete Attributes', attributes);
        });
    },
    validate(attributes) {
        const requiredFields = ['firstname', 'lastname', 'email', 'city'];
        const keys = Object.keys(attributes);
        const pass = requiredFields.every(field => keys.includes(field) && attributes[field]);
        if (!pass) {
            return new Error(`Invalid attribute(s)`);
        }
    }
});

/** Collections */
const Users = Backbone.Collection.extend({
    model: User,
    url: '/all-users',
    reset: true,
    initialize: function() {
      this.on('add', (model, collection) => {
        console.log('Model added', model.attributes);
        
      });
      this.on('sync', (modelOrCollection, arrayOrAttributes) => {
        // Note:
        //arrayOrAttributes could be an array of attributes or single attribute object in the case of say a PUT server response
        //modelOrCollection can be a collection for JSON array returned from say GET /all-users endpoint or a single model return from PUT /user endpoint 
        if (arrayOrAttributes instanceof Array) {
            renderTableBody(arrayOrAttributes);
        } 
        console.log('Sync Model Or Collection', modelOrCollection);
        console.log('Model Attributes Or Array of Attributes', arrayOrAttributes); 
      });
      this.on('change destroy', (model) => {
          if(model.isValid()) {
            renderTableBody(this.models.map(model => model.attributes));
          }
      });
      this.on('error', (model, err) => {
        showError(`${err.status} ${err.statusText}`);

        console.log('Model error', model);
        console.error('Ajax Collection Error', err);
      });
      this.on('invalid', (model) => {
        console.error('Invalid model', model.attributes);
      });
      this.on('customRender', () => {
        renderTableBody(this.models.map(model => model.attributes));
      });
    }
});

const users = new Users();

/*** CRUD Functionality **/
/**
 * Fetch users collection
 * GET /all-users
 */
function getUsersCollection() {
  /*
  users.fetch()
       .done(res => { 
           console.log(res);
           renderTableBody(res)
        })
       .fail(err => {
           showError(`${err.status} ${err.statusText}`);
           console.error(err);
       });
  */
  /** I can ommit the .done() and .fail() chain since the Users collection class defined a 'sync' and 'error' events respectively, I can handle it there */
  users.fetch();
}


 /**
  * Fetch user
  * GET /user/:userId
  */
 function fetchUser() {
    const userId= $('#fetchUserId').val();
    if (!userId) {
      $('#fetchError').slideDown();
      setTimeout(() => {
          $('#fetchError').slideUp();
      }, 5000)
      return false;
    }
    const user = new User({ userId });
    /*
    user.fetch()
        .done(attributes => {
          const html = generateBody(attributes) 
          $('#fetchBody').html(html);
        }).fail(err => {
            showError(`Ajax fetch error: ${err.status} ${err.statusText}`);
            console.error('Fetch Error Details', err);
        });
    */

    /* since the User model class implements a 'sync' and 'error' event listeners i can ommit the .done() and .fail() method chain */
   user.fetch();
}

/**
 * Create user 
 * POST /user
 */
function addUser() {
    const userData = getFormData();
    const user = new User(userData);

    if(user.isValid()) {
        user.save()
            .done(attributes => {
              users.add(attributes);
              users.trigger('customRender');
              clearFormData();
           })
           .fail(err => console.error(err.message));
    } 
}

/**
 * Update User
 * PUT /user/:userId
 */
function updateUser() {
    const data = getFormData();
    console.log('Older User', data)
    const user = users.get(data.userId).set(data);
    
    console.log('new user', user);
    if (user.isValid()) {
        user.save()
        .done(attributes => {
            resetForm();
        });
    }
    
 }
 

 /**
  * Delete user record
  * DELETE /user/:userId
  * @param {number} userId 
  */
 function deleteUser(userId) {
    const user = users.get(userId)
    if (confirm(`Are you sure you want to delete user ${user.get('firstname')}`)) {
       /* I don't need the success and error callback i.e destoy({success: func, error: func}) 
        * success and error event will be handled by the model call 'sync' and error events.accordion
        */
       user.destroy();
       users.remove(userId);
    } 
  }


/*** Helper Functions **/
function renderTableBody(users) {
    const rowCollection = new RowCollection(users);
    const tableView = new TableBodyView({collection: rowCollection});
    $('#tableBody').replaceWith(tableView.render());
}


function editUser(userId) {
  const user = users.get(userId);
  populateFormFields(user.attributes);
  $('#addBtn').slideUp();
  $('#clearBtn').slideDown();
  $('#updateBtn').slideDown();
}


function generateBody(model) {
     const userView = new UserView({ model });
     $('#fetchBody').replaceWith(userView.render());
}

function resetForm() {
    clearFormData();
    $('#addBtn').slideDown();
    $('#clearBtn').slideUp();
    $('#updateBtn').slideUp();
}

function populateFormFields(user) {
    $('#userId').val(user.userId);
    $('#firstname').val(user.firstname);
    $('#lastname').val(user.lastname);
    $('#email').val(user.email);
    $('#city').val(user.city);
}

function getFormData() {
    const userId = $('#userId').val();
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const email = $('#email').val();
    const city = $('#city').val();
    const data = { firstname, lastname, email, city };
    if (userId) {
      data.userId = userId;
    }
    return data;
}

function showError(message) {
    $('#error').html (`<pre>${message}</pre>`)
    $('#error').slideDown();
    setTimeout(() => {
      $('#error').slideUp();
    }, 5000);
}

function clearFormData() {
    $('#userId').val('');
    $('#firstname').val('');
    $('#lastname').val('');
    $('#email').val('');
    $('#city').val('');
}