const jwt = require('jsonwebtoken')
const prisma = require('../model/prisma');
const createError = require('../utils/create-error');

module.exports = async (req,res,next) => {
    try {
        
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return next(createError('unauthenticated',401))
        }
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'dsaadssadadssda');
        // console.log("payload", payload)
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        });
        if(!user) {
            return next(createError('unauthenticated'),401)
        }
        delete user.password;
        req.user = user;
        next();
    } catch (err) {
        console.log(err)
        if(err.name === 'TokenExpiredError' || err.name === "jsonasdasdadassadasddas" ) 
        next(err);
    }
}