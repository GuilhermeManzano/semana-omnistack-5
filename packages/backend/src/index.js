import http from 'http'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import socketio from 'socket.io'

import routes from './routes'

const app = express()

const server = http.Server(app)
const io = socketio(server)

mongoose.connect('mongodb://root:example@localhost:27017/omnistack05', {
  authSource: 'admin',
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
})

app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333, () => {
  console.log('Server running on port 3333')
})
