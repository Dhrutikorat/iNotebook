require('dotenv').config()
const connectToMongo = require('./db');
var cors = require('cors') // security packages

connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()); // to use request body in any URL

/**Available Routes */
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/user', require('./routes/user'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})