const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', //localhost
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});


const app = express();


// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// initial database
// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'john',
// 			email: 'john@gmail.com',
// 			password: 'cookies',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'sally',
// 			email: 'sally@gmail.com',
// 			password: 'banana',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 		{
// 			id: '987',
// 			has: '',
// 			email: 'john@gmail.com'
// 		}
// 	]
// }


app.get('/', (req, res) => { res.send(database.users)})

// app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt)})
app.post('/signin', signin.handleSignIn( db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//not used yet, its for the future
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImageRank(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})





app.listen(3001, () => {
	console.log('app is running on port 3001');
})


/* 
Planning your API:

/ --> res = this is working
/signin --> POST = succes/fail
/register  --> POST = user
/profile/:userId  --> GET = user
/image  --> PUT --> user  (this updates the ranking)

*/