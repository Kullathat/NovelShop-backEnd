const prisma = require('../model/prisma');

exports.address = async (req,res,next) => {
    try {
        const { id } = req.user
        const { city ,country,province,zipcode} = req.body
        const address = await prisma.address.create({
            data : {
                city,
                country,
                province,
                zipcode,
                userId : id
            }
            
        });
        res.status(201).json({address})
    } catch (err) {
        console.log(err)
        next(err);
    }
}
