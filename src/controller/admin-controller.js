const { date } = require("joi")
const prisma = require("../model/prisma")
const dateFormat = require('../utils/dateFormat')
const fs = require('fs/promises')
const { cloudinary } = require("../utils/cloudinary-service");

exports.addItem = async (req, res, next) => {
    try {
        const { price, bookName, author, description,bookImage} = req.body
        const result = await prisma.book.create({
            data: {
                bookName,
                price: +price,
                author,
                description,
                bookImage
            } 
        }) 
        
        res.status(201).json({ result })
    } catch (err) {
        console.log(err)
        next(err)
    } 
}


exports.getAllOrder = async (req, res, next) => {
    const { date } = req.body
    try {
        const result = await prisma.orders.findMany({
            where: {
                status: 'notConfirm',
            },
            include: {
                user: true,
                orderProduct:true
            }
        }
        )
        res.status(201).json({ result })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
exports.confirmOrder = async (req, res, next) => {
    const { orderId } = req.body;
    console.log(id);
    try {
        const result = await prisma.orders.update({
            where: {
                orderId: orderId,
            },
            data: {
                status: 'Confirm',
            },
        });

        res.status(201).json({ result });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
exports.deleteOrder = async (req, res, next) => {
    const { orderId} = req.params
    try {
        const orderProduct = await prisma.orderProduct.deleteMany({
            where:{
                orderId:+orderId
            }
        })
        const result = await prisma.orders.delete({
            where: {
                id: +orderId
            }
            
        })
        res.status(201).json({result})
    } catch(err) {
        console.log(err)
        next(err)
    }
}

exports.bookProduct = async (req, res, next) => {
    try {
        const result = await prisma.book.findMany({
            select: {
                id: true,
                bookName: true,
                price: true,
                bookImage: true,
                description: true
            }
        });
        res.status(201).json({ result });
    } catch (err) {
        next(err);
    }
}

exports.clickBook = async (req,res,next) => {
    try {
        
    }
}

