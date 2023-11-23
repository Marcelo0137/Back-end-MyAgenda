const {Router} = require ('express')
const UserController = require('../../controllers/UserController')
const AppointmentController = require('../../controllers/AppointmentController')
const AuthController = require('../../controllers/AuthController')

const routes = Router()


routes.get('/', (req,res) => {
    res.status(200).json('Página Inicial')
})

// ---------- Rotas Usuário -----------------
routes.post('/auth/register',UserController.createUser);
routes.get('/users', UserController.getUsers);
routes.get('/users/:user_id', UserController.getUserById);
routes.patch('/users/:user_id', UserController.updatedUser);

// ---------- Rotas Compromissos -----------------
routes.get('/appointments', AppointmentController.getAppointment);

routes.post('/appointment/:user_id', AppointmentController.createAppointment);
routes.get('/appointment/:user_id', AppointmentController.getUserAppointments);
routes.patch('/appointment/:user_id/:appointment_id', AppointmentController.updatedAppointment);
routes.delete('/appointment/:user_id/:appointment_id', AppointmentController.deleteAppointment);

// ---------- Rotas Login -----------------
routes.post('/register', AuthController.register);
routes.post('/auth', AuthController.login);

// ---------- Rotas Privadas -----------------
routes.get('/auth/:user_id',AuthController.checkToken, AuthController.protect);

module.exports = routes