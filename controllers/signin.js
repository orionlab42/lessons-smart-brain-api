const handleSignIn = ( db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	// Load hash from your password DB.
	// bcrypt.compare("apples", '$2a$10$md7MRs8EVyYN5nlTP4R1aeszf8yzZkL95e6EHKsx7VdxbQd5R4BUm', function(err, res) {
 //    console.log('first guess', res)
	// });
	// bcrypt.compare("veggies", '$2a$10$md7MRs8EVyYN5nlTP4R1aeszf8yzZkL95e6EHKsx7VdxbQd5R4BUm', function(err, res) {
 //    console.log('second guess', res)
	// });
	// if (req.body.email === database.users[0].email && 
	// 	req.body.password === database.users[0].password) {
	// 	res.json(database.users[0]);
	// } else {
	// 	res.status(400).json('error logging in');
	// }
	db.select('email', 'hash').from('login')
	.where('email', '=', email )
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if (isValid) {
			return db.select('*').from('users')
			.where('email', '=', email )
			.then(user => {
				console.log(user);
				res.json(user[0])
			}) 
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong credentials')	
		}	
	})
	.catch(err => res.status(400).json('wrong credentials'))
}


module.exports = {
	handleSignIn: handleSignIn
};