const bcrypt = require('bcryptjs');
const { registerSchema, loginSchema } = require("../validator/auth-validator");
const jwt = require('jsonwebtoken');
const prisma = require('../model/prisma');
const createError = require('../utils/create-error')


exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error)
    }
    // ได้ prisma 
    value.password = await bcrypt.hash(value.password, 10);
    const user = await prisma.user.create({
      data: value
    });
    // create เสร็ตส่งออกไป token ส่งต่อไป payload
    const payload = { userId: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'qwerrttyuiu', {
      expiresIn: process.env.JWT_EXPIRE
    });
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body)
    if (error) {
      return next(error);
    }
    const user = await prisma.user.findFirst({
      where: {
           userName: value.userName 
      }
    });
    if (!user) {
      return next(createError('invalid Login', 400));
    }
    const compareMatch = await bcrypt.compare(value.password, user.password)
    if (!compareMatch) {
      return next(createError('invalid Login', 400));
    }
    const payload = { userId: user.id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'qwerrttyuiu', {
      expiresIn: process.env.JWT_EXPIRE
    });

    delete user.password;
    res.status(200).json({ accessToken,user });
  } catch (err) {
    next(err);
  }
};
exports.getMe = async (req, res, next) => {
  res.status(200).json({ user: req.user });
}