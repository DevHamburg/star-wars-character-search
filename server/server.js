const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())

app.get('/'),
  (req, res) => {
    res.json(data)

    console.log(data)
  }

app.listen(process.env.PORT || 3000, () => {
  console.log('Server ready on port 3000')
})
