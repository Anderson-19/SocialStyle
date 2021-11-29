require('../helpers/database');
const mp = require('multiparty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { post } = require('../models/Post');



const addPost = passport.authenticate('jwt', { session: false })? (req, res):(req, res) => {

   
    
			const text = req.body.text.trim()

			const newPost = new Post({
				user: {
					id: req.user.id,
					login: req.user.login
				},
				text
			})

			newPost.save()
				.then(post => res.json(post))
				.catch(err => console.log(err))
};

const getPosts = (req, res) => {
			Post.find()	
				.sort({ createdAt: -1 })
				.then(posts => res.json(posts))
				.catch(err => console.log(err))
};

const followingPosts = passport.authenticate('jwt', { session: false })? (req, res):(req, res) => {
	
			Post.find({
				'user.id': { $in: req.user.following }
			})
			.sort({ createdAt: -1 })
			.then(posts => res.json(posts))
			.catch(err => console.log(err))
};

const userPost = (req, res) => {
    
		Post.find({ 'user.id': req.params.userId })
			.sort({ createdAt: -1 })
			.then(posts => res.json(posts))
			.catch(err => console.log(err))
};

module.exports = {
    addPost,
    getPosts,
    userLogin,
    userPost
}
