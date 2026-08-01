//Validation middleware

//import joi for validation
const Joi = require('joi');


//use joi to validate the edited request body
const validateEditBlog = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).optional(),
    content: Joi.string().min(10).optional(),
    author: Joi.string().optional().default('Guess'),
    category: Joi.string().min(3).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('draft', 'published').optional(),
    views: Joi.number().integer().min(0).optional()
  });
  const { error,value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


module.exports = validateEditBlog;