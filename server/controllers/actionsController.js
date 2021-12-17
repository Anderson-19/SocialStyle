require('../helpers/database');
const mp = require('multiparty');
const jwt = require('jsonwebtoken');
const { likePost } = require('../models/Post');

const giveLike = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if (error){
            res.status(400).json({title: 'Error', content: error.message});
        }
        else{
            let {sessionToken, post_id} = fields
            try {
                let verify = jwt.verify(sessionToken[0], process.env.JWT_SECRET);
                if(verify.connect){   
                    likePost.create({ post_id: post_id[0], user_id: verify.id });
                    res.status(200).json({verify: true});
                }else{
                    res.status(400).json({verify: false, text: 'Error'});
                }
            } catch (error) {
                console.log(error);
            }
        }
    })
}

const giveDislike = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await likePost.deleteOne(
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

const getLikes = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){  
            let likes = await likePost.aggregate(
                [
                    {$lookup:
                        {
                            from: 'posts',
                            localField: 'post_id',
                            foreignField: '_id',
                            as: 'post'
                        }
                    },
                    {$unwind: '$post'}
                ]
            ); 
            res.status(200).json({verify: true, countLikes: likes.length, content: likes});
  
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    giveLike,
    giveDislike,
    getLikes
}