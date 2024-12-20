const express = require('express');
const app = express();
const User = require('./models/user');
const port = 3000;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DATABASE_NAME = 'auth';
const CONNECTION_STRING = `mongodb://localhost:27017/${DATABASE_NAME}`;

app.use(express.urlencoded({ extended: true }));

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

//app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.send("Home Page");
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
   const {username, password} = req.body;
   const hashedPassword = await bcrypt.hash(password, 12);
   const user = new User({
    username,
    password: hashedPassword
})
   await user.save()
   res.redirect('/');
});

app.get('/secret', (req, res) => {
    res.send('This is secret')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})