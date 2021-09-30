const jwt = require("jsonwebtoken");

const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log(req.body);

    if(!authHeader){
        return res.status(401).send({error : 'No token provided'});
    }

    const parts = authHeader.split(' ');

    if(!parts.length ===2){
        return res.status(401).send({error : 'Token error'}); 
    }
    
    const [scheme, token] = parts;

    // Create REGEX
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error : 'Token malformatted'}); 
    }

    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({error : 'Token invalid'}); 
        }
        req.teacher_id = decoded.id;
         
        if(!decoded.isTeacher){
            return res.status(401).send({error : 'Access denied'}); 
        }
        return next();
    })

}