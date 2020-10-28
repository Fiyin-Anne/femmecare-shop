import Joi from "joi";

const registerValidation = user => {
  const schema = Joi.object({
    username: Joi.string().required().alphanum().min(4)
      .max(50)
      .empty()
      .messages({
        "any.required": "Username is required",
        "string.alphanum": "Username must contain only alphanumeric characters",
        "string.empty": "Username cannot be an empty field",
        "string.min": "Username should have a minimum length of 4 and a maximum length of 50"
      }),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co"] } }).min(5)
      .max(100)
      .empty()
      .messages({
        "any.required": "Sorry, email is required",
        "string.empty": "Sorry, Email cannot be an empty field",
        "string.email": "Please enter a valid email",
      }),
    password: Joi.string().required().empty().min(5)
      .max(1024)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "any.required": "Password is required",
        "any.only": "Password does not match",
        "string.pattern.base": "Password must contain only alphanumeric characters.",
        "string.empty": "Password cannot be an empty field",
        "string.min": "Password should have a minimum length of 5"
      }),
    verify_password: Joi.string().required()
       .valid(Joi.ref('password'))
       .messages({
         "any.required": "Verify password is required.",
         "any.only": 'Password must match.'
        })
  }).options({ abortEarly: false });
  return schema.validate(user);
};

const loginValidation = user => {
  const schema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co", "io"] } }).min(5)
      .max(100)
      .empty()
      .messages({
        "any.required": "Email is required",
        "string.email": "Please enter a valid email",
        "string.empty": "Email cannot be an empty field",
      }),
    password: Joi.string().required()
      .messages({
        "string.empty": "Password cannot be an empty field"
      }),
  });
  return schema.validate(user);
};

export { registerValidation, loginValidation };
