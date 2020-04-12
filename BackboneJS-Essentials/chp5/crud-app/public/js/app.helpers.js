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