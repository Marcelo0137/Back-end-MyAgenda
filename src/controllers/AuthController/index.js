const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async(req,res) => {
    const {password, email} = req.body;

    // Validações
    
    if(!password) {
       return res.status(422).json({msg: 'A Senha é obrigatória!'});
    }

    if(!email){
       return res.status(422).json({msg: 'O Email é obrigatório!'});
    }

    // Checar se usuário existe
    const userExists = await User.findOne({email: email});

    if(userExists){
        return res.status(422).json({msg : 'Email já cadastrado'})
    }

    // Criar Senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Criar Novo Usuário
    const user = new User ({
        password: passwordHash,
        email,
        

    });

    // Enviar Informações
    try{

        await user.save()
        res.status(201).json({msg : 'Usuário criado com sucesso!'})

    }catch(err) {
        console.log(err)
        res.status(500).json({err: 'Error no servidor!'})
    }

}

const login = async(req,res) =>{
    const {email,password} = req.body

    if(!email || !password ){
        return res.status(422).json({msg: 'Informações incompletas!'})
    }

    // Checar se usuário existe
    const user = await User.findOne({email: email})

    if(!user){
        return res.status(404).json({msg : 'Usuário não cadastrado'})
    }

    // Checar senha
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(422).json({msg: 'Senha incorreta!'})
    }

    try{

        const secret = process.env.SECRET
        
        /*
        const token = jwt.sign({
            id: user._id,
        },
        secret,)
        */
        res.status(200).json({msg: 'Autenticação realizada com sucesso!', token:{
            id: user._id,
        }})
    }catch(err){
        console.log(err)
        
        res.status(500).json({msg: 'Error'})
    }
    
}

const protect = async(req,res) => {
    const id = req.params.user_id

    // Checa se usuário existe
    const user = await User.findById(id, '-password')
    
    if(!user){
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    res.status(200).json({user})
}

function checkToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(404).json({msg: 'Acesso negado!'})
    }

    try{

        const secret = process.env.SECRET

        jwt.verify(token,secret)

        next()

    }catch(err){
        res.status(400).json({msg: 'Token inválido!'})
    }

    
}


module.exports = {register,
                  login,
                  protect,
                  checkToken}