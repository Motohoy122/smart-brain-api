const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const profile = require('./controllers/profile')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Sign In
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});

//Register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});

//Profile
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db, bcrypt)});

//Image
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});



app.listen(3000, ()=> {
  console.log('app is running on port 3000');
});

//PLAN OUT API
/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/