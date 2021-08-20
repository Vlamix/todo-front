const express = require('express')
const app = express()
const cors = require('cors')

const corsOptions = {
   origin: ['http://localhost:3000', 'http://localhost:3001'],
   //optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

async function start() {
   app.use(cors(corsOptions))

   app.use(express.json())

   app.use((req, res, next) => {
      if (req.params) {
         next()
      }
   })

   app.get('/', (req, res) => {

      res.json({
         test: 'ok',
         newInput: `its your new input`
      })
   })

   app.post('/text', async (req,res) => {
      return res.status(200).json({text: req.body.text})
   })

   app.put('/text/:id', async (req, res) => {

      res.send('i got put')
      console.log('it work')
   })

   app.delete('/text/:id', (req, res) => {

      const id = req.params.id
      console.log(id)

   })
   app.post('/text', (req, res) => {

   })
   app.listen(5000, () => console.log(`Server is listening on port 5000`))
}

try {
   start()
} catch (err) {
   console.log(err)
}
