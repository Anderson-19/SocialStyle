const mongoose = require('mongoose'); 
/* const { Pool } = require('pg');

 const pool = new Pool({
    host: 'localhost',
    database: 'red-social',
    user: 'postgres',
    password: '29758990',
    max : 5, // max number of clients in the pool
    connectionTimeoutMillis : 5000,
    idleTimeoutMillis : 30000
});   

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,
    },
    idleTimeoutMillis: 1000,
    min: 0,
    query_timeout: 5000
}); 



pool.on('error', (error, client) => {
    console.log(error);
});


const getClient = async () => {
    return await pool.connect();
} */

mongoose.connect(process.env.MONGODB_URL, (err) =>{
    if(err){
        console.log(`******************* ERROR IN THE CONNECTION **************`)
    }else{
        console.log(`******************* CORRECT CONNECTION ${process.env.MONGODB_URL} **************`)
    }
});

module.exports = {
    /* getClient */
}

