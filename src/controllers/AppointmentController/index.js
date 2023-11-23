const Appointment = require('../../models/Appointment')


const AppointmentController = {

    async createAppointment(req,res) {

        const body = req.body
        const {user_id} = req.params

        try{
            
            const data = {user: user_id, ...body}

            const newAppointment = await Appointment.create(data)
            return res.status(201).json(newAppointment)

        } catch(err){
            
            return res.status(400).json(err)            

        }
    },
    
    async getUserAppointments(req,res) {

        const {user_id} = req.params

        try{

            const appointmentsOfAnUser = await Appointment.find({user: user_id})
            return res.status(200).json(appointmentsOfAnUser)

        } catch(err){

            return res.status(400).json(err)
        }


    },

    async updatedAppointment(req,res){

        const body = req.body
        const {appointment_id, user_id} = req.params

        try{

            const updatedAppointment = await Appointment.findByIdAndUpdate(appointment_id,body,{new : true})
            return res.status(200).json(updatedAppointment)


        } catch {

            return res.status(400).json(err)
        }

    },

    async deleteAppointment(req,res){

       
        const {appointment_id,user_id} = req.params

        try{

            const deletedAppointment = await Appointment.findByIdAndDelete(appointment_id)
            return res.status(200).json(deletedAppointment)

        } catch {

            return res.status(400).send(err)
        }

    },

    async getAppointment(req,res){ // Talvez não seja necessário

        try {

            const appointment = await Appointment.find()
            return res.status(200).json(appointment)

        } catch {

            return res.status(400).send(err)
        }
    
    },

    async getAppointmentById(req,res){ // Talvez não seja necessário

        const { appointment_id} = req.params 

        try {

            const appointment = await Appointment.findById(appointment_id)
            return res.status(200).json(appointment)

        } catch {

            return res.status(400).send(err)
        }
        
    }
    



   
} 
module.exports = AppointmentController

