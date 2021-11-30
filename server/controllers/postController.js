require('../helpers/database');
const mp = require('multiparty');
const jwt = require('jsonwebtoken');
const { post } = require('../models/Post');

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
            await post.find({author:{$eq:'61a39ededa51f85ca3ad22a9'}}).
            then(posts => {
                res.status(200).json({verify: true, content: posts}) 
            });
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    }
}

const updatePost = async (req, res) =>{

}

const deletePost = async (req, res) =>{

}
    

module.exports ={
    postCreation,
    getPosts,
    updatePost,
    deletePost
}