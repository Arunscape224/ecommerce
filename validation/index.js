export const signupValidator = (req, res, next) => {
    req.check('firstName', 'please enter your first name').notEmpty()
    req.check('lastName', 'please enter your first name').notEmpty()
    req.check('email', 'email is required').notEmpty()
    req.check('email', 'email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        })
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength({min: 6})
        .withMessage('Password must contain atleast 6 characters')
        .matches(/\d/)
        .withMessage("password must contain a number")
        
        const errors = req.validationErrors()
        if(errors) {
            const firstError = errors.map(error => error.msg)[0]
            return res.status(400).json({ error: firstError })
        }
        next()
} 