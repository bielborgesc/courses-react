var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const authCofig = require('../../config/auth.json')

const User = require("../../models/User");

function generateToken(params = {}){
    return jwt.sign(params, authCofig.secret, {
        //Exipered?
        expiresIn: 86400, 
    } )
}

module.exports ={

    async listAll(req, res){
        const users = await User.findAll({
            attributes: ['id','name', 'email', 'is_teacher']
        });

        if(users == 0)
            res.status(200).json({message : "No Registered Users!"})
        return res.json(users);
    },
   

    async register(req, res){
        
        const {email} = req.body;

        try{
            if(await User.findOne({where : {email}})){
                return res.status(400).json({error: 'Email already exists'})
            }
    
            const user = await User.create(
                req.body
            ); 
            
            user.password_hash = undefined;

            return res.json({
                user,
                token : generateToken({id: user.id, isTeacher : user.is_teacher})
            });
        } catch (err){
            return res.status(500).json({error: 'Register failed'})
        } 
                        
        
    },

    async login(req, res){
        
        const {email, password} = req.body;

        try {
            const user = await User.findOne({
                where: {email}
            })
    
            if(!user) {
                return res.status(400).json({message: 'User not found.'})
            }
    
    
            if(!await bcrypt.compare(password, user.password_hash)){
                return res.status(400).json({error : 'Invalid Password'})
            }
    
            user.password_hash = undefined;
    
    
           return res.status(200).json({
            user, 
            token:  generateToken({id : user.id, isTeacher : user.is_teacher}),
           })

        } catch (err) {
            return res.status(500).json({error : 'Authenticate error'})
        }
       
    }

};