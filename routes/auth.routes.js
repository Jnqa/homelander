const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = requre('config')
const {check,validationRsesult, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/aurh/register
router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Bad pass').isLength({min: 6})
    ],
    async (reg, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Bad data in registration'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            res.status(400).json({ message: 'User exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message:'User created'})

    } catch (e) {
        res.status(500).json({message:'Something wrong'})
    }
})

// /api/auth/login
router.post(
    '/login',     
    [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'Bad pass').exists()
    ],
    async (reg, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Bad data in login'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'No user' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'bad password '})
        }

        const token = jwt.sign(
            {  userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({token, userId: user.id })

    } catch (e) {
        res.status(500).json({message:'Something wrong while login'})
    }
})

module.exports = router