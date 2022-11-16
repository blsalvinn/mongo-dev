require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@db-1511.b26nh7f.mongodb.net/db-1511?retryWrites=true&w=majority`
// const CONNECTION_URL = `mongodb+srv://dev01:1234@db-1511.b26nh7f.mongodb.net/db-1511?retryWrites=true&w=majority`

const connectDB = async () => {

	// try {
	// 	await mongoose.connect(
	//         `mongodb+srv://dev01:1234@db-1511.b26nh7f.mongodb.net/db-1511?retryWrites=true&w=majority`,
	// 		{
	// 			useCreateIndex: true,
	// 			useNewUrlParser: true,
	// 			useUnifiedTopology: true,
	// 			useFindAndModify: false
	// 		}
	// 	)

	// 	console.log('MongoDB connected')
	// } catch (error) {
	// 	console.log(error.message)
	// 	process.exit(1)
	// }
	mongoose.connect(CONNECTION_URL).then(() => { console.log('MongoDB connected') }).catch(() => { console.log('fail') })
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())
// app.get('/', (req, res) => res.send('hello world'))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))