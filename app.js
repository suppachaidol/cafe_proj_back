const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()


app.use(cors())
app.use(jsonParser)
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api/images/profile",express.static('resources/images/profile'))
app.use("/api/images/cafe",express.static('resources/images/cafe'))
app.use("/api/images/tutorial",express.static('resources/images/tutorial'))

app.use('/api', require('./routes/users'))
app.use('/api', require('./routes/cafe'))
app.use('/api', require('./routes/reviews'))
app.use('/api', require('./routes/user_cafe')) 
app.use('/api', require('./routes/cafe_time')) 



app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})