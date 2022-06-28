const express = require('express')
const { PrismaClient } = require('@prisma/client');
const app = express()
const cors = require('cors');
const prisma = new PrismaClient()
app.use(cors())


//PEGA (ID,NOME,URLIMG, NOME CARGOS) DOS MEMBROS PARA LISTAR NA TELA HOME
app.get('/Membros', async (req, res) => {
  const membros = await prisma.membros.findMany({
    select: {
      id: true,
      nome: true,
      url_foto:true
    },
    orderBy: {
      nome: "asc"
    }
  });
  res.send(membros)
})

//CARREGA TODOS OS CARGOS EXISTENTES
app.get('/Cargos', async (req, res) => {
  const cargos = await prisma.cargo.findMany();
  res.send(cargos);
})

app.listen(4041, () => {
  console.log("Servidor Express Funcionando!!")
})