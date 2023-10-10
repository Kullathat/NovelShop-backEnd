exports.register = async (req, res, next) => {
    try {
      const { value, error } = registerSchema.validate(req.body)
      console.log(value)
      if (error) {
        return next(error)
      }
    } catch (err) {
      next(err);
    }
  };