const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(express.json())
app.use(bodyParser.json())

app.get('/all', (req, res) => {
  const data = fs.readFileSync('search-data.txt', 'utf-8')
  res.json(data)
})

app.post('/search', (req, res) => {
  const data = JSON.stringify(req.body)
  fs.writeFileSync('search-data.txt', data, {
    flag: 'a',
  })
  res.json(data)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server ready on port ' + port)
})
