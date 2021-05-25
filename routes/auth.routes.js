const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const express = require('express')
const router = Router()
const config = require('config')

// const {Router} = require('express')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const {check, validationResult} = require('express-validator')
// const User = require('../models/User')
// const router = Router()
// const config = require('config')


// /api/auth
router.post(
    '/register', 
    [
        check('email', 'Bad email').isEmail(),
        check('password', 'Bad password').isLength({min:8})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Bad data'
            })
        }

        const {email, password} = req.body
        const candidate = await findOne({ email })

        if (candidate){
            res.status(400).json({message: 'User already exists'})
            
        }

        const hashedPassword = await hash(password, 12)
        const user = new User({email,password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User created'})


    } catch (e) {
        res.status(500).json({message: 'Something wrong'})
    }
})

// /api/auth
router.post(
    '/login',  
    [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'no password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Bad login'
            })
        }

        const {email, password} = req.body
        const user = await findOne({email})

        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Bad pass'})
        }

        const token = sign(
            { userId: user.id },
            get('jwtSectet'),
            { expiresIn: '1h'}
        )

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({message: 'Something wrong'})
    }
})

module.exports = router;