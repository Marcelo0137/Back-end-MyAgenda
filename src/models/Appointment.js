const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    title: {        // Título da tarefa
        type: String,
        required: [true, 'Título Obrigatório']
    },
    user: {         // Usuário relacionado a tarefa
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Usário não definido na tarefa']
    },
    describe: {     // Descrição da tarefa
        type: String,
        default: ''
    },
    date_hour: {    // Data e hora da tarefa
        type: Date,
        required: [true, 'Data do agendamento não definida']
    }

})

module.exports = mongoose.model('Appointment', Schema);