const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()


app.use(cors())
app.use(jsonParser)
// app.use(router)

app.use('/api', require('./routes/users'))


app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})