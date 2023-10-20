const prisma = require('../model/prisma');


exports.product = async (req, res, next) => {
    try {
        const product = await prisma.book.findMany({
            select: {
                id: true,
                bookName: true,
                price: true,
                bookImage: true,
                description: true
            }
        });
        res.status(201).json({ product });
    } catch (err) {
        next(err);
    }
}

exports.addCart = async (req, res, next) => {
    try {
        const { id } = req.user
        const { quantity , bookId } = req.body

        const previousProduct = await prisma.cart.findFirst({
            where: {
                bookId,
                userId: id
            }
        })
        if (previousProduct) {
            await prisma.cart.updateMany({
                data: {
                    userId: id,
                    bookId,
                    quantity: previousProduct.quantity + 1,
                },
                where: {
                    id: previousProduct.id,
                }
            });
        } else {
            await prisma.cart.create({
                data: {
                    userId: id,
                    bookId,
                    quantity: 1
                }
            })
        }
        res.status(201).json({ previousProduct })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.cartItem = async (req, res, next) => {
    try {
        const cartItem = await prisma.cart.findMany({
            include: {
                book: true
            }
        });
        res.status(201).json({ cartItem })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteItem = async (req, res, next) => {
    const { cartId } = req.params
    try {
        const deleteItem = await prisma.cart.delete({
            where: {
                id: +cartId
            }
        })
        res.status(201).json({ deleteItem })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
exports.addItem = async(req,res,next) => {
    try {
        const { price,description,author,bookName,bookImage } = req.body
           const addItem =  await prisma.book.create({
                data: {
                    bookImage,
                    price: +price,
                    bookName,
                    description,
                    author
                }
            })
            res.status(201).json({addItem})
        }  catch (err) {
            console.log(err)
            next(err)
        }  
    }

