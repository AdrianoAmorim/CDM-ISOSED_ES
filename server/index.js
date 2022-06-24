const express = require('express')
const app = express()

app.get('/Membros', (req, res) => {
    res.send('Hello World!')
  })

app.listen(4041, () => {
    console.log("Servidor Express Funcionando!!")
  })