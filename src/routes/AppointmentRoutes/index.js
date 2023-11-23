const {Router} = require ('express')
const AppointmentController = require('../../controllers/AppointmentController')

const routes = Router()

routes.post('/appointment/:user_id', AppointmentController.createAppointment)
routes.get('/appointment/:user_id', AppointmentController.getUserAppointments)
routes.patch('/appointment/:user_id/:appointment_id', AppointmentController.updateAppointment)
routes.delete('/appointment/:user_id/:appointment_id', AppointmentController.deleteAppointment)



module.exports = routes