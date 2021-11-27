const mongoose = require('mongoose');

let connection = mongoose.connect(process.env.MONGODB_URL, (err) =>{
    if(err){
        console.log(`******************* ERROR IN THE CONNECTION **************`)
    }else{
        console.log(`******************* CORRECT CONNECTION ${process.env.MONGODB_URL} **************`)
    }
});

module.exports = {
    connection
}