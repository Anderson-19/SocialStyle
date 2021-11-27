const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require:true
        },
        username:{
            type: String,
            require:true
        },
        lastname:{
            type: String,
            require:true
        },
        email:{
            type: String,
            require:true,
            unique:true
        },
        password:{
            type: String,
            require:true
        },
        location:{
            type: String,
            require:true
        },
        date:{
            type: String,
            require:true
        },
        
    },
    {
        timestamps:true,
        versionKey: false
    }
);

const user = new mongoose.model('users', userSchema);

module.exports = {
    user
}