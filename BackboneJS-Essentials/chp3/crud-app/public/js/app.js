$(document).ready(function() {
  getUserCollection();
  
  $('#clearBtn').css({display: 'none'});
  $('#updateBtn').css({display: 'none'});

  $('#addBtn').click(addUser);
  $('#clearBtn').click(resetForm);
  $('#updateBtn').click(updateUser);
  $('#fetchBtn').click(fetchUser);
});

/**global variable */
let users = [];

/*** CRUD Functions **/

/**
 * Read users collection
 * GET /all-users
 */
function getUserCollection() {
    fetch('/all-users').then(res => res.json())
                   .then(data => {
                        users = data;
                        renderTableBody();                     
                   })
                   .catch(err => console.error(err));
}

 /**
  * Fetch user
  * GET /users/:userId
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
    const User = Backbone.Model.extend({
        urlRoot: '/users',
        idAttribute: 'userId'
    });
    const user = new User({ userId });
    user.fetch()
        .done(attributes => {
          const html = generateBody(attributes) 
          $('#fetchBody').html(html);
        }).fail(err => console.error(err));
}

/**
 * Create user 
 * POST /user
 */
function addUser() {
    const User = Backbone.Model.extend({
        urlRoot: '/user',
        idAttribute: 'userId',
        validate: (attributes, options) => {
          // options is the second argument passed to set() or save()
          if (!validateData(attributes)) {
            return new Error('Invalid or incomplete user input');
          }
        }
    });
    const userData = getFormData();
    const user = new User(userData);
    user.on('invalid', (model, err) => {
        console.error(model.attributes);
        showError(err.message);
        return false;
    });

    if(user.isValid()) {
        user.save()
            .done(result => {
                users.push(result);
                renderTableBody();
            clearFormData();
            })
            .fail(err => console.error(err));
    } 
}

/**
 * Update User
 * PUT /user/:userId
 */
function updateUser() {
    const data = getFormData();
    const User = Backbone.Model.extend({
        urlRoot: '/user',
        idAttribute: 'userId',
        validate: (attributes, options) => {
           if (!validateData(attributes)) {
               return new Error('Incorrect or empty user input');
           }
        }
    });
    const user = new User();
    user.on('invalid', (model, err) => {
        console.error(model.attributes);
        showError(err.message);
        return false;
    });
    if (user.isValid()) {
        user.save(data, {
            success: (result) => {
              const updatedUser = result.attributes;
              const userIndex = users.findIndex(u => u.userId == updatedUser.userId)
              users[userIndex] = updatedUser;
              renderTableBody();
              resetForm();
            },
            error: (err) => {
                console.error(err)
            }
        });
    }
    
 }
 


 /**
  * Delete user record
  * DELETE /user/:userId
  * @param {number} userId 
  */
 function deleteUser(userId) {
    const user = users.find(u => u.userId == userId)
    if (confirm(`Are you sure you want to delete user ${user.firstname}`)) {
       const User = Backbone.Model.extend({
           urlRoot: '/user',
           idAttribute: 'userId'
       });
       const userDetails = users.find(u => u.userId == userId); 
       const user = new User(userDetails);
       user.destroy({
           success: (model, response, options)  => {
              //console.log('Destroy model', model)
              //console.log('Destroy option', options);
              const alertDiv = $('#alert')
              alertDiv.html(`<p>${response.msg}</p>`);
              alertDiv.slideDown(); 
              setTimeout(() => {
                  alertDiv.slideUp('fast');
              }, 3000);
              
              const userIndex = users.findIndex(u => u.userId == userId);
              users.splice(userIndex, 1);
              renderTableBody();
           },
           error: (err) => {
               console.error(err);
           }
       });
    } 
  }

 /*** Helper Functions **/
function renderTableBody() {
    $('#tableBody').empty();
    users.forEach(record => {
        addToTable(record);
    });
}

function addToTable(record) {
    const row = `<tr> 
            <td>${record.userId}</td>
            <td>${record.firstname}</td>
            <td>${record.lastname}</td>
            <td>${record.email}</td>
            <td>${record.city}</td>
            <td>
              <button onclick="editUser(${record.userId})">Edit</button>
            </td>
            <td>
              <button onclick="deleteUser(${record.userId})">Delete</button>
            </td>
          </tr>`
    $('#tableBody').append(row);
}

function editUser(userId) {
  const user = users.find(u => u.userId == userId);
  populateFormFields(user);
  $('#addBtn').slideUp();
  $('#clearBtn').slideDown();
  $('#updateBtn').slideDown();
}


function generateBody(attributes) {
 const html = `
        <tr> 
            <td><strong>ID</strong></td>
            <td>${attributes.userId}</td>
        </tr>
        <tr> 
            <td><strong>Firstname</strong></td>
            <td>${attributes.firstname}</td>
        </tr>
        <tr> 
            <td><strong>Lastname</strong></td>
            <td>${attributes.lastname}</td>
        </tr>
        <tr> 
            <td><strong>Email</strong></td>
            <td>${attributes.email}</td>
        </tr>
        <tr> 
            <td><strong>City</strong></td>
            <td>${attributes.city}</td>
        </tr>
  ` 
  return html;
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

function validateData(data) {
  const keys = Object.keys(data);
  return keys.every(key => data.hasOwnProperty(key) && data[key])
}

function clearFormData() {
    $('#userId').val('');
    $('#firstname').val('');
    $('#lastname').val('');
    $('#email').val('');
    $('#city').val('');
}