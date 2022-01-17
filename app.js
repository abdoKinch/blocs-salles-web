const express = require('express')
const app = express()
const WebSocket = require('ws')
const server = require('http').createServer(app)
const wss = new WebSocket.Server({ server: server })

const blocs = require('./routes/blocs')
const salles = require('./routes/salles')
const creneaux = require('./routes/creneaux')
const occupations = require('./routes/occupations')
const historique = require('./routes/historique')
const statistiques = require('./routes/statistiques')

const connectDB = require('./db/connect')
require('dotenv').config()
//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/blocs', blocs)
app.use('/api/salles', salles)
app.use('/api/creneaux', creneaux)
app.use('/api/occupations', occupations)
app.use('/api/historique', historique)
app.use('/api/statistiques', statistiques)

//Connexion à la base de donnée et au serveur
const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    server.listen(port, () => {
      console.log(`Server is listening on port : ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send()
      }
    })
  })
})

start()
