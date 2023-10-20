const prisma = require('../model/prisma');
const { STATUS_notConfirm } = require('../config/constant')
exports.getOrder = async (req, res, next) => {
    try {
        const getOrder = await prisma.cart.findMany({
            include: {
                book: true
            }
        })
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
exports.orderAddIn = async (req, res, next) => {
    try {
        const { quantity, bookId, totalPrice, orderId } = req.body
        const { id } = req.user
        const orderAddIn = await prisma.Orders.create({
            data: {
                userId: id, 
                totalPrice: +totalPrice,
                status: 'notConfirm',
                orderProduct : {
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

        res.status(201).json({ orderAddIn })
    } catch (err) {
        console.log(err)
        next(err)
    }

}