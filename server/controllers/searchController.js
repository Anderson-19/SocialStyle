require('../helpers/database');
const mp = require('multiparty');
const jwt = require('jsonwebtoken');
const { post } = require('../models/Post');
const { user } = require('../models/User');

const searchTweet = (req, res) => {


    User.findOne({
        $or: [
            {email: req.body.text},
            {login: req.body.text}
        ]
    })

    Post.findOne({
        $or: [
            {description: req.body.text},
            {login: req.body.text}
        ]
    })

    .then(user => res.json({ userId: user._id }))
    .catch(err => res.status(404).json({ msg: 'User not found'}))
}

const getSearch = (req, res) => {
router.route('/:id')
.get((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                return res.json({
                    _id: user._id,
                    email: user.email,
                    login: user.login,
                    followers: user.followers,
                    following: user.following
                })
            } else {
                return res.status(404).json({ msg: 'User not found'})
            }
        })
        .catch(err => console.log(err))
})

module.exports = {
    searchTweet,
    userLogin
}