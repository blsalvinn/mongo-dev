const express = require('express')
const argon2 = require('argon2') //hashpass
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')

router.get('/', (req, res) => res.send('USER ROUTE'))

const not_found = { success: false, message: "Incorrect" }
// @route POSR api/auth/register
// @đesc Register user
// @access Punlic
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    // Validation ez
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Miss pass, or username' })

    try {
        const user = await User.findOne({ username })

        if (user)
            return res.status(400).json({ success: false, message: 'Username already taken' })

        //
        const hashedPass = await argon2.hash(password)
        const newUser = new User({
            username, password: hashedPass
        })
        await newUser.save()

        // return tolen
        // const accessToken = jwt.sign({ userId: newUser._id }, clgtccvcldcmccc123654789)
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCES_TOKEN_SECRET
        )
        res.json(
            {
                success: true,
                message: 'ok', accessToken
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POSR api/auth/register
// @đesc Register user
// @access Punlic
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    //
    if (!username || !password)
        return res.status(400)
            .json(not_found)

    try {
        //
        const user = await User.findOne({ username })
        if (!user)
            return res
                .status(400)
                .json(not_found)

        // us found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res
                .status(400)
                .json(not_found)

        // goodjob
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCES_TOKEN_SECRET
        )
        res.json(
            {
                success: true,
                message: 'Logged ok',
                accessToken
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
module.exports = router