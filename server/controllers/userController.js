require('../helpers/database');
const mp = require('multiparty');
const bcrypt = require('bcrypt');
const { user } = require('../models/userSchemas');

const userRegistration = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if (error){
            res.status(400).json({title: 'Error', content: error.message});
        }
        else{
            let {name, username, lastname, email, password, location, date} = fields
            let data = verifyData(username[0], email[0], password[0]);
            if(data !== 'OK'){
                res.status(400).json({title: 'Error', content: data});
            }else{
                hashPassword(password[0]).then(response =>{
                    user.create({ name: name[0], username: username[0], lastname: lastname[0], email: email[0], password: response.pass, location: location[0], date: date[0] });
                    res.status(200).json({verify: true, text: 'El usuario se ha creado'})
                })
            }
        }
    })
}

const hashPassword = async (pass) =>{
    let salt = await bcrypt.genSalt();
    pass = await bcrypt.hash(pass, salt);
    return {pass};
}

const verifyData = (username, email, password) => {
    if (username.length < 1 || email.length < 1 || password.length < 1){
        return 'One or more fields empty.';
    }
    else if (username.length < 3 || username.length > 25){
        return 'Username must be between 3 and 25 characters.';
    }
    else if (password.length < 5 || password.length > 30){
        return 'Passwords must be between 5 and 30 characters.';
    }
    else{
        return 'OK';
    }
}

module.exports = {
    userRegistration
}