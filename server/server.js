const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(___dirname, 'client', 'build', 'index.html'))
  })
}

app.get('/all', (req, res) => {
  const data = fs.readFileSync('search-data.txt', 'utf-8')
  res.json(data)
})

app.post('/search', (req, res) => {
  const data = JSON.stringify(req.body)
  const timestamp = Date.now()
  const searchResult = data + timestamp

  fs.writeFileSync('search-data.txt', searchResult, {
    flag: 'a',
  })
  res.json(data)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Server ready on port ' + port)
})
