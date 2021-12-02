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
                /* insertPost(description[0], verify.id).then(response =>{
                        if(response.bool){
                            res.status(200).json({verify: true, text: 'El post se ha creado'})
                        }else{
                            res.status(500).json({verify: false})
                        }
                    }) */
            }else{
                res.status(400).json({verify: false, text: 'Error'});
            }
        }
    })
}

/* const insertPost = async (description,id) =>{
   let client = await db.getClient(); 
    let query = 'INSERT INTO posts(comment, media, date, user_id) VALUES($1, $2, NOW(), $3)';
    let params = [description,'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png', id]; 
    try {
        await client.query(query, params);
        return {bool: true}
    } catch (error) {
        console.log(error)
    }
} */

const getPosts = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        /* let client = await db.getClient(); */
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        let query = 'SELECT * FROM posts';
        if(verify.connect){
            await post.find({author:{$eq:verify.id}}).
            then(posts => {
                res.status(200).json({verify: true, content: posts }) 
            });
         /*   await client.query(query).then(response =>{
               console.log(response.rows)
                res.status(200).json({verify: true, content: response.rows }) 
            }); */
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
        /* let client = await db.getClient(); */
        let query = 'SELECT * FROM posts WHERE post_id = $1';
        if(verify.connect){   
            await post.findOne({_id:{$eq:req.params.id}}).
            then(posts => {
                res.status(200).json({verify: true, content: posts }) 
            }); 
            /* await client.query(query, [req.params.id]).then(response =>{
                res.status(200).json({verify: true, content: response.rows});
            }); */
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