const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Post = require('../models/Post')

const err_400 = { success: false, message: "Title is required" }
// const completed = 
const err_500 = { success: false, message: 'Internal server error' }

// @router GET api/post
// @desc GET post
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', 'username')
        res.json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'fail' })
    }
})


// @router POST api/post
// @desc Create post
// @access Private

// add verify token
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    //Simple validation
    if (!title)
        return res.status(400).json({ success: false, message: "Title is required" })

    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || 'TO LEARN',
            // user: '6373180d17cc346dda54f1d6'
            user: req.userId
        })

        await newPost.save()

        res.json({ success: true, message: "Welcome to the world!!", post: newPost })

    } catch (error) {
        console.log(error)
        res.status(500).json(err_500)
    }
})

// @router PUT api/post
// @desc Update post
// @access Private

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    //
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: "Title is required" })

    try {
        let updatePost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN'
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }

        //findOneAndUpdate(condition, data_update)
        updatePost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatePost, { new: true }
        )

        //User not authorised to update post

        if (!updatePost)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Post not found'
                })

        res.json({ success: true, message: 'Excellent progress!', post: updatePost })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router