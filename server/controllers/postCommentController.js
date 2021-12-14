require('../helpers/database');
const mp = require('multiparty');
const jwt = require('jsonwebtoken');
const { postComment } = require('../models/Post');


const commentCreation = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if (error){
            res.status(400).json({title: 'Error', content: error.message});
        }
        else{
            let {token, description, id} = fields
            let verify = jwt.verify(token[0], process.env.JWT_SECRET);
            if(verify.connect){
                postComment.create({author: id[0], description: description[0]})
                res.status(200).json({verify: true, text: 'El post se ha creado'})
            }else{
                res.status(400).json({verify: false, text: 'Error'});
            }
        }
    })
}


const getComments = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await postComment.find({/* author:{$eq:verify.id} */}).
            then(comments => {
                res.status(200).json({verify: true, content: comments })  
            });
            //res.status(200).json({verify: true, content: join }) 
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    }
}


const deleteComment = async (req, res) =>{
    let token = req.headers.authtoken;
    console.log(req.params.id)
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await postComment.deleteOne(
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
    commentCreation,
    getComments,
    deleteComment
}