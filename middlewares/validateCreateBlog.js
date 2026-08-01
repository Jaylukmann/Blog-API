//Validation middleware

//import joi for validation
const Joi = require('joi');


//use joi to validate the request body
const validateCreateBlog = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(30).required(),
    author: Joi.string().optional().default('Guest'),
    category: Joi.string().min(3).required(),
    tags: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('draft', 'published').required(),
    views: Joi.number().integer().min(0).optional()
  });
  const { error,value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


module.exports = validateCreateBlog;