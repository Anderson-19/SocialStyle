const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
	{
		author:{
			type: mongoose.Types.ObjectId
		},
		description:{
			type: String,
			require:true
		}
	},
    {
        timestamps:true,
        versionKey: false
    }
	
)

const postCommentSchema = new mongoose.Schema(
	{
		author:{
			type: mongoose.Types.ObjectId
		},
		description:{
			type: String,
			require:true
		}
	},
    {
        timestamps:true,
        versionKey: false
    }
	
)

let post = new mongoose.model('post', postSchema);
let postComment = new mongoose.model('postComments', postCommentSchema);

module.exports = {post, postComment}

