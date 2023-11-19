const prisma = require('../model/prisma');
const createError = require('../utils/create-error');
const { upload } = require('../utils/cloudinary-service');
const fs = require('fs/promises');


exports.getOrder = async (req, res, next) => {
    try {
        const getOrder = await prisma.cart.findMany({
            include: {
                book: true
            }
        })
        console.log(getOrder)
        res.status(201).json({ getOrder })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getProductInOrder = async (req, res, next) => {
    const { id } = req.user
    try {
        const deleteCart = await prisma.cart.deleteMany({
            where: {
                userId: id
            }
        })
        res.status(201).json({ deleteCart })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
exports.createOrderFromCart = async (req, res, next) => {
    try {

        const { id } = req.user
        const { bookId, totalPrice, orderId, quantity } = req.body


        await prisma.orders.create({
            data: {
                userId: id,
                totalPrice: +totalPrice,
                status: 'notConfirm',
                orderProduct: {
                    create: [
                        {
                            bookId,
                            orderId,
                            quantity: +quantity
                        }
                    ]
                }
            }
        });

        res.status(201).json({msg: 'createOrderFromCart' })
    } catch (err) {
        console.log(err)
        next(err)
    }

}



exports.uploadSlip = async (req, res, next) => {
    console.log(req.files)
    try {
        if (!req.files) {
            return next(createError('Slip is required'))
        }
        if (req.files.slip) {
            const url = await upload(req.files.slip[0].path);
            const addOrder = await prisma.orders.updateMany({
                data: {
                    slip: url   
                },
                where: {
                    userId: req.user.id
                }
            })

            res.status(201).json({ msg: 'finish'});
        }
    } catch (err) {
        next(err)
    } finally {
        fs.unlink(req.files.slip[0].path);
    }
}