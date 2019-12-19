const path = require('path');

const express = require('express');

const books = require('./data'); 

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('json spaces', 4);

app.post('/add-book', (req, res) => {
  const lastId = books[books.length-1].bookId;
  const newBook = req.body;
  newBook.bookId = lastId + 1;
  books.push(newBook);
  res.json(newBook);
});

app.post('/tech', (req, res) => {
    res.send(req.body);
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(book => book.bookId == req.params.id);
  res.json(book);
});

app.get('/book-array/:id', (req, res) => {
  /* Here we wrap the book in an array*/
  const book = books.find(book => book.bookId == req.params.id);
  res.json([book]);
});

app.delete('/books/:id', (req, res) => { 
  res.json(req.body);
});


app.set('port', 3001);
app.listen(app.get('port'), () => console.log(`Sever running at localhost ${app.get('port')}`));