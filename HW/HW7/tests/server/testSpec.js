// Setup our assertion library
var expect = require('chai').expect;
var request = require('supertest');
var app = require('./../../app.js');
var index = require('./../../routes/index');
var User = require('../../models/userModel.js');
var Twote = require('../../models/tweetModel.js');
var user = request.agent('http://localhost:3000');


 describe("A test suite for index.js", function() {
 	// Load the homepage
 	it('should load the homepage', function(done) {
		// 200 OK if page loads correctly
 		request(app).get('/').expect(200,done);
 	});

	// Load the login page
 	it('should load the login page', function(done) {
 		// 200 OK if page loads correctly
 		request(app).get('/login').expect(200,done);
 	});

	// Redirect the user after login
 	it('should redirect after login page', function(done) {
 		// 302 redirect
 		user.post('/login').send({username: "kb!34", password: "hi"}).expect(302,done);
 	});

	// Failed login attempt
 	it('should give an error if login failed', function(done) {
 		// 401 if unauthorized
 		user.post('/login').send({username: "xxxx", password: "0000"}).expect(401,done);
 	});

	// Load the register page
 	it('should respond with a 200 OK for registration page', function(done) {
  		// 200 OK if page loads correctly
 		request(app).get('/register').expect(200,done);
 	});

	// Error when registering a user that already exists 
 	it('should load an error if user already exists', function(done) {
 		user.post('/register').send({username: "kb!34", password: "hi"}).expect(500,done);
 	});

	// Load the new tweet
 	it('should add the new tweet', function(done) {
 		user.post('/newTwote').send({tweetText: "hey everyone!"}).expect(200,done);
 	});
 });


