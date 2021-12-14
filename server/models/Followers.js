const mongoose = require('mongoose')

const followersSchema = new mongoose.Schema(
	{
		follower:{
			type: mongoose.Types.ObjectId,
			require:true,
            unique:true
		},
        following:{
			type: mongoose.Types.ObjectId,
			require:true,
            unique:true
		}
	},
    {
        timestamps:true,
        versionKey: false
    }
	
)

let followers = new mongoose.model('followers', followersSchema);

module.exports = {followers}