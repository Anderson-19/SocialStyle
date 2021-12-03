require('../helpers/database');
const mp = require('multiparty');
const jwt = require('jsonwebtoken');
const db = require('../helpers/database');
const { post } = require('../models/Post');
const { user } = require('../models/User'); 

const postCreation = (req, res) => {

    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if (error){
            res.status(400).json({title: 'Error', content: error.message});
        }
        else{
            let {token, description} = fields
            let verify = jwt.verify(token[0], process.env.JWT_SECRET);
            if(verify.connect){
                post.create({author: verify.id, description: description[0]})
                res.status(200).json({verify: true, text: 'El post se ha creado'})
            }else{
                res.status(400).json({verify: false, text: 'Error'});
            }
        }
    })
}


const getPosts = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await post.find({author:{$eq:verify.id}}).
            then(posts => {
                res.status(200).json({verify: true, content: posts }) 
            });
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    }
}

const getPost = async (req, res) =>{
    let token = req.headers.authtoken;
    console.log(req.params.id)
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){   
            await post.findOne({_id:{$eq:req.params.id}}).
            then(posts => {
                res.status(200).json({verify: true, content: posts }) 
            }); 
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    } 
}

const getSearchPosts = async (req, res) =>{
    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if (error){
            res.status(400).json({title: 'Error', content: error.message});
        }
        else{
            let {token, postSearch} = fields
            res.status(200).json({text: `${postSearch[0]}`});
        }
    })
    res.status(200).json({text: `${req.body.postSearch}`})
}

const updatePost = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await post.updateOne(
                {
                    _id: req.body.post_id
                },
                {
                    description: req.body.description
                }
            )
            res.status(200).json({verify: true}) 
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    } 

}

const deletePost = async (req, res) =>{
    let token = req.headers.authtoken;
    console.log(req.params.id)
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await post.deleteOne(
                {
                    _id: req.params.id
                }
            )
            res.status(200).json({verify: true}) 
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    } 
}
    

module.exports ={
    postCreation,
    getPosts,
    getPost,
    getSearchPosts,
    updatePost,
    deletePost
}