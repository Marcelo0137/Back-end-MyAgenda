const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    
    password : {    // Senha do usuário
        type: String,
        required: [true,'Senha Obrigatória']
    },
    email : {       // Email do usuário
        type:String,
        required: [true,'Email obrigatório']
    }
    

});

module.exports = mongoose.model('User',Schema);