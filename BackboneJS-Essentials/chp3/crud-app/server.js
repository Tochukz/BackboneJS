const path = require('path');
const express = require('express');
const morgan = require('morgan');
const data = require('./data');
const app = express();

/** Middlewares */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ strict: true }));
app.use(morgan('short'));


/** Routes */
app.get('/all-users', (req, res) => {
    return res.json(data);
});

app.get('/users/:userId', (req, res) => {
    if (!req.params.userId) {
        return res.status(400).send({msg: 'invalid parameter'});
    }
    const user = data.find(user => user.userId == req.params.userId);
    return res.json(user);
});

app.post('/user', (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
      return res.status(400).send({msg: 'invalid data'});
    }
    const newUser = req.body;
    if (data.length > 0) {
      newUser.userId = parseInt(data[data.length-1].userId) + 1;
    } else {
       newUser.userId = 1;
    }

    data.push(newUser);
    const lastUser = data[data.length -1];
    return res.json(lastUser);
});

app.put('/user/:userId', (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).send({msg: 'invalid data'});
    }
    /* Username and password must be verified for real application */
    const index = data.findIndex(user => user.userId == req.params.userId);
    const user = data[index];
    const userData = req.body;
    delete userData.userId;
    const updatedUser = Object.assign(user, userData);
    data[index] = updatedUser;
    return res.json(data[index]);
});

app.delete('/user/:userId', (req, res) => {
    const index = data.findIndex(user => user.userId == req.params.userId);
    data.splice(index, 1);
    res.json({msg: `user with ID ${req.params.userId} has been deleted`});
});


const port = 8090;
app.listen(port, () => console.log(`Server is running on port ${port}`));
